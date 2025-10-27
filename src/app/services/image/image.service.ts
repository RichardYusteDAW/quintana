import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import config from '../../app.environment';
import { ImageData } from '../../models/ImageData';
import { Observable } from 'rxjs';

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

  public getAll() {
    return this.http.get<ImageData[]>(`${this.url}${this.endpoint}`);
  }
}