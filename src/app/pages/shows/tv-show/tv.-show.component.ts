import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-tv-show',
  imports: [],
  templateUrl: './tv-show.component.html',
  styleUrl: './tv-show.component.css'
})
export class TvShowComponent {

  shows = [
    { title: 'Magia en Valencia', id: 'valencia', value: 'XaOxVfAozP8' },
    { title: 'Curso de Magia', id: 'course', value: 'ZCAEtGjFjRI' },
    { title: 'Magia en la Calle', id: 'street', value: 'H-QXT8TMMEw' }
  ];

  videoUrlSafe!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.setVideo('XaOxVfAozP8');
  }

  public showVideo(event: Event) {
    const id = (event.target as HTMLInputElement).value;
    this.setVideo(id);
  }

  private setVideo(id: string) {
    if (!/^[\w-]{11}$/.test(id)) return;
    const url = `https://www.youtube.com/embed/${id}`;
    this.videoUrlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}