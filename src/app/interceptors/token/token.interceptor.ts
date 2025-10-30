import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError, EMPTY } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  /********** DEPENDENCIAS **********/
  const authService = inject(AuthService);
  const router = inject(Router);

  /********** VARIABLES **********/
  let isRetried = false;

  /********** RUTAS EXCLUIDAS **********/
  if (req.url.endsWith('/admin/login') || req.url.endsWith('/admin/refresh-token'))
    return next(req);


  /********** FUNCIONES AUXILIARES **********/
  const setAuthHeaders = (accessToken: string) =>
    req.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } });

  const isTokenExpired = (err: HttpErrorResponse): boolean => {
    const msg = String(err?.error?.error ?? err?.error?.message ?? '');
    const wa = err.headers?.get('WWW-Authenticate') ?? '';
    return /expired/i.test(msg) || (/invalid_token/i.test(wa) && /expired/i.test(wa));
  };

  /********** OBTENER ACCESS TOKEN **********/
  const accessToken = authService.getAccessToken();
  if (!accessToken) {
    router.navigate(['/login']);
    return EMPTY;
  }

  /********** REQUEST PRINCIPAL **********/
  return next(setAuthHeaders(accessToken)).pipe(
    catchError((err: HttpErrorResponse) => {

      if (err.status === 401) {

        if (isTokenExpired(err) && !isRetried) {
          isRetried = true;

          return authService.refreshToken().pipe(
            switchMap(() => {
              const newAccessToken = authService.getAccessToken();
              if (!newAccessToken) {
                router.navigate(['/login']);
                return EMPTY;
              }

              return next(setAuthHeaders(newAccessToken));
            }),
            catchError(refreshErr => {
              console.error('Error al refrescar token:', refreshErr);
              authService.logout();
              router.navigate(['/login']);
              return throwError(() => refreshErr);
            })
          );
        }

        authService.logout();
        router.navigate(['/login']);
      }

      return throwError(() => err);
    })
  );
};
