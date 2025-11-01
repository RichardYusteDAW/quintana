import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import config from '../../app.environment';
import { RawVideo } from '../../models/RawVideo';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private url: string = config.url;
  private endpoint: string = '/videos';

  constructor(private http: HttpClient) { }

  public getAll() {
    return this.http.get<RawVideo[]>(`${this.url}${this.endpoint}`);
  }

  public upload(videos: RawVideo[]) {
    return this.http.post(`${this.url}${this.endpoint}`, videos);
  }

  public delete(videoId: string) {
    return this.http.delete(`${this.url}${this.endpoint}/${videoId}`);
  }
}