import { Component } from '@angular/core';
import { ImageService } from '../../../../services/image/image.service';
import { ImageData } from '../../../../models/ImageData';

@Component({
  selector: 'app-admin-photos',
  imports: [],
  templateUrl: './admin-photos.component.html',
  styleUrl: './admin-photos.component.css'
})
export class AdminPhotosComponent {

  images: ImageData[] = [];
  selectedFile: File | null = null;

  constructor(private imageService: ImageService) { }

  ngOnInit() {
    this.getAllImages();
  }

  /********** PUBLIC **********/
  public onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  public onSubmit() {
    if (!this.selectedFile) {
      alert('Por favor, selecciona un archivo antes de subir.');
      return;
    };

    const formData = new FormData();
    formData.append('image', this.selectedFile);

    this.imageService.upload(formData).subscribe({
      next: res => alert('Imagen subida con éxito:'),
      error: err => console.error('Error al subir la imagen:', err)
    });
  }


  /********** PRIVATE **********/
  private getAllImages() {
    this.imageService.getAll().subscribe({
      next: res => this.images = res,
      error: err => console.error('Error al obtener las imágenes:', err)
    });
  }
}