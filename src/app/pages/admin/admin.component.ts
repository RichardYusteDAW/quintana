import { Component } from '@angular/core';

import { ImageService } from '../../services/image/image.service';

@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  selectedFile: File | null = null;

  constructor(private imageService: ImageService) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
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