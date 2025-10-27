import { Component } from '@angular/core';
import { ImageService } from '../../../../services/image/image.service';

@Component({
  selector: 'app-admin-photos',
  imports: [],
  templateUrl: './admin-photos.component.html',
  styleUrl: './admin-photos.component.css'
})
export class AdminPhotosComponent {
  selectedFile: File | null = null;

  constructor(private imageService: ImageService) { }

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
}