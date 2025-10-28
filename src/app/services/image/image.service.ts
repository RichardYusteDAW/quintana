import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import config from '../../app.environment';
import { ImageRequest } from '../../models/ImageRequest';
import { ImageResponse } from '../../models/ImageResponse';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private url: string = config.url;
  private endpoint: string = '/images';

  constructor(private http: HttpClient) { }

  public getAll() {
    return this.http.get<ImageRequest[]>(`${this.url}${this.endpoint}`);
  }

  public upload(image: FormData) {
    return this.http.post(`${this.url}${this.endpoint}`, image);
  }

  public updateName(ImageResponse: ImageResponse) {
    return this.http.put(`${this.url}${this.endpoint}`, ImageResponse);
  }

  public delete(imageName: string) {
    return this.http.delete(`${this.url}${this.endpoint}`, {
      params: { filename: imageName }
    });
  }
}