import { Component } from '@angular/core';

import { PhotoCardComponent } from "./photo-card/photo-card.component";
import { ImageData } from '../../../../models/ImageData';
import { ImageService } from '../../../../services/image/image.service';

@Component({
  selector: 'app-photos',
  imports: [PhotoCardComponent],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.css'
})
export class PhotosComponent {
  photos: ImageData[] = [];

  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    this.getAllImages();
  }

  /********** PRIVATE **********/
  private getAllImages() {
    this.imageService.getAll().subscribe({
      next: (res: ImageData[]) => this.photos = res,
      error: (err: any) => console.error('Error al obtener las imágenes:', err)
    });
  }
  // private loadFotos() {
  //   const totalPhotos = 26;
  //   for (let i = 1; i <= totalPhotos; i++) {
  //     const newPhoto = { link: `img/pictures/${i}.jpg`, alt: `Photo ${i}` };
  //     this.photos.push(newPhoto);
  //   }
  // }
}