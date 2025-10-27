import { Component } from '@angular/core';
import { PhotoCardComponent } from "./photo-card/photo-card.component";

@Component({
  selector: 'app-photos',
  imports: [PhotoCardComponent],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.css'
})
export class PhotosComponent {
  photos: { link: string; alt: string }[] = [];

  ngOnInit(): void {
    this.loadFotos();
  }

  private loadFotos() {
    const totalPhotos = 26;
    for (let i = 1; i <= totalPhotos; i++) {
      const newPhoto = { link: `img/pictures/${i}.jpg`, alt: `Photo ${i}` };
      this.photos.push(newPhoto);
    }
  }
}