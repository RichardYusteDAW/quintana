import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap } from 'rxjs';

import config from '../../app.environment';
import { LoginCredentials } from '../../models/LoginCredentials';
import { TokenRequest } from '../../models/TokenRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = config.url;
  private endpoint: string = '/admin';

  constructor(private http: HttpClient) { }

  login(loginCredentials: LoginCredentials) {
    return this.http.post<TokenRequest>(`${this.url}${this.endpoint}/login`, loginCredentials);
  }

  getAccessToken() {
    return sessionStorage.getItem('accessToken') ?? '';
  }

  getRefreshToken() {
    return sessionStorage.getItem('refreshToken') ?? '';
  }

  refreshToken() {
    const refreshToken = this.getRefreshToken();
    const accessToken = this.getAccessToken();

    if (!refreshToken || !accessToken) {
      throw new Error('No tokens available');
    }

    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    const body = { refreshToken };

    return this.http.post<TokenRequest>(`${this.url}${this.endpoint}/refresh-token`, body, { headers })
      .pipe(
        tap(res => {
          sessionStorage.setItem('accessToken', res.accessToken);
          sessionStorage.setItem('refreshToken', res.refreshToken);
        })
      );
  }

  logout() {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
  }
}