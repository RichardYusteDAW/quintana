import { Injectable } from '@angular/core';

import config from '../../app.environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private url: string = config.url;
  private endpoint: string = '/images';

  constructor(private http: HttpClient) { }

  public upload(image: FormData) {
    return this.http.post(`${this.url}${this.endpoint}`, image);
  }

  public download(imageId: string) {
    return this.http.get(`${this.url}${this.endpoint}/${imageId}`, { responseType: 'blob' });
  }
}