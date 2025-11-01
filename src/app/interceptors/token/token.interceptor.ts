import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, switchMap, throwError, EMPTY } from 'rxjs';

import { AuthService } from '../../services/auth/auth.service';


export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  /********** DEPENDENCIAS **********/
  const authService = inject(AuthService);
  const router = inject(Router);

  let isRetried = false;

  const excluded = [
    { url: '/admin/login', methods: ['POST'] },
    { url: '/images', methods: ['GET'] },
    { url: '/videos', methods: ['GET'] }
  ]
  const isExcluded = excluded.some(rule => req.url.includes(rule.url) && rule.methods.includes(req.method));
  if (isExcluded) return next(req);

  const setAuthHeaders = (accessToken: string) =>
    req.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } });

  const accessToken = authService.getAccessToken();
  if (!accessToken) {
    router.navigate(['/login']);
    return EMPTY;
  }

  return next(setAuthHeaders(accessToken)).pipe(
    catchError((err: HttpErrorResponse) => {

      if (err.status === 401) {

        if (err.error?.jwt?.includes('expired') && !isRetried) {
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