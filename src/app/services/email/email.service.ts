import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import config from '../../app.environment';
import { ContactForm } from '../../models/ContactForm';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private url: string = config.url;
  private endpoint: string = '/email';

  constructor(private http: HttpClient) { }

  public sendEmail(data: ContactForm) {
    return this.http.post(`${this.url}${this.endpoint}`, data);
  }
}