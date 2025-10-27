import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-videos',
  imports: [],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.css'
})
export class VideosComponent {
  rawVideos = [
    { id: '3bqOTlCmi7k', title: 'Video 1' },
    { id: '-6mDxEY9_3k', title: 'Video 2' },
    { id: 'HZoxukNIIxE', title: 'Video 3' },
    { id: 'H-QXT8TMMEw', title: 'Video 4' },
    { id: 'eEVK5zDr-sk', title: 'Video 5' },
    { id: '2U55bGGEFMY', title: 'Video 6' },
    { id: 'tHmKPHN18pY', title: 'Video 7' },
    { id: 'cSUeRTvge7g', title: 'Video 8' }
  ]

  videos: { id: string, title: string, safeUrl: SafeResourceUrl }[] = [];

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.sanitize();
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
