import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { RawVideo } from '../../../../models/RawVideo';
import { Video } from '../../../../models/Video';
import { VideoService } from '../../../../services/video/video.service';

@Component({
  selector: 'app-videos',
  imports: [],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.css'
})
export class VideosComponent {

  rawVideos: RawVideo[] = [];
  videos: Video[] = [];

  constructor(private sanitizer: DomSanitizer, private videoService: VideoService) { }

  ngOnInit(): void {
    this.getAllVideos();
  }

  private getAllVideos() {
    this.videoService.getAll().subscribe({
      next: (rawVideos: RawVideo[]) => {
        this.rawVideos = rawVideos;
        this.sanitize();
      },
      error: (error) => {
        console.error('Error fetching videos:', error);
      }
    });
  }

  private sanitize() {
    this.videos = this.rawVideos.map(video => {
      const url = `https://www.youtube.com/embed/${video.id}`;
      return {
        ...video,
        safeUrl: this.sanitizer.bypassSecurityTrustResourceUrl(url)
      };
    });
  }
}
