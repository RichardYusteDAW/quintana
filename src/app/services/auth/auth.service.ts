import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import config from '../../app.environment';
import { LoginCredentials } from '../../models/LoginCredentials';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = config.url;
  private endpoint: string = '/login';

  constructor(private http: HttpClient) { }

  login(loginCredentials: LoginCredentials) {
    return this.http.post(`${this.url}${this.endpoint}`, loginCredentials);
  }
}