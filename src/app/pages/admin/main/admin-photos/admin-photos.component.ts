import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ImageService } from '../../../../services/image/image.service';
import { ImageRequest } from '../../../../models/ImageRequest';
import { ImageResponse } from '../../../../models/ImageResponse';

@Component({
  selector: 'app-admin-photos',
  imports: [FormsModule],
  templateUrl: './admin-photos.component.html',
  styleUrl: './admin-photos.component.css'
})
export class AdminPhotosComponent {

  @ViewChildren('filenameInput') filenameInputs!: QueryList<ElementRef>;
  input: ElementRef | undefined = undefined;
  images: ImageRequest[] = [];
  editingImg: ImageResponse | null = null;

  constructor(private imageService: ImageService) { }

  ngOnInit() {
    this.getAllImages();
  }

  /********** PUBLIC **********/
  public startEdit(imageName: string, index: number) {

    this.editingImg = {
      oldName: imageName,
      newName: ''
    }

    setTimeout(() => {
      this.input = this.filenameInputs.get(index);
      if (this.input) {
        const el = this.input.nativeElement;
        el.disabled = false;
        el.focus();
        el.select();
      }
    });
  }

  public saveEdit(imageName: string) {

    if (!this.checkUpdateImageName(imageName)) return;

    this.editingImg!.newName = imageName;

    this.imageService.updateName(this.editingImg!).subscribe({
      next: res => {
        alert('Nombre de imagen actualizado con éxito.');
        this.getAllImages();
      },
      error: err => console.error('Error al actualizar el nombre de la imagen:', err),
      complete: () => this.resetEditingState()
    });
  }

  public cancelEdit(filenameInput: HTMLInputElement) {
    filenameInput.value = this.editingImg!.oldName;
    this.resetEditingState();
  }

  public onDeleteImage(imageName: string) {
    const confirmed = confirm(`¿Estás seguro de que quieres eliminar la imagen "${imageName}"? Esta acción no se puede deshacer.`);
    if (!confirmed) return;

    this.imageService.delete(imageName).subscribe({
      next: res => this.getAllImages(),
      error: err => console.error('Error al eliminar la imagen:', err)
    });
  }

  public uploadImage(fileInput: HTMLInputElement) {
    const file = fileInput.files?.[0];

    if (!this.checkUploadImage(file)) return;

    const formData = new FormData();
    formData.append('image', file!);

    this.imageService.upload(formData).subscribe({
      next: res => alert('Imagen subida con éxito:'),
      error: err => console.error('Error al subir la imagen:', err)
    });
  }


  /********** PRIVATE **********/
  private getAllImages() {
    this.imageService.getAll().subscribe({
      next: res => {
        this.images = res;
        this.orderImagesByName();
      },
      error: err => console.error('Error al obtener las imágenes:', err)
    });
  }

  private orderImagesByName() {
    this.images.sort((a, b) => a.name.localeCompare(b.name));
  }

  private checkUpdateImageName(imageName: string) {
    const trimName = imageName.trim();

    // Check empty name
    if (trimName === '') {
      alert('El nombre de la imagen no puede estar vacío.');
      return false;
    }

    // Check extension
    const oldExtension = this.editingImg!.oldName.split('.').pop()?.toLowerCase();
    const newExtension = trimName.split('.').pop()?.toLowerCase();

    if (oldExtension !== newExtension) {
      const confirmed = confirm('¿Estás seguro de que quieres cambiar la extensión de la imagen?');
      if (!confirmed) return false;
    }

    const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
    const fileExtension = trimName.split('.').pop()?.toLowerCase();
    if (!fileExtension || !validExtensions.includes(fileExtension)) {
      alert('La imagen debe tener una extensión válida: ' + validExtensions.join(', '));
      return false;
    }

    // Check same name as before
    if (this.editingImg!.oldName === trimName) {
      this.resetEditingState();
      return false;
    }

    // Check duplicate name with other images
    const duplicate = this.images
      .find(img => img.name === trimName);

    if (duplicate) {
      alert('Ya existe una imagen con ese nombre. Por favor, elige otro nombre.');
      return false;
    }

    return true;
  }

  private checkUploadImage(file: File | undefined) {
    if (!file) {
      alert('Por favor, selecciona un archivo antes de subir.');
      return false;
    }

    const maxSizeMB = 2;
    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`El archivo supera el tamaño máximo de ${maxSizeMB} MB.`);
      return false;
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Solo se permiten imágenes JPG, PNG o WEBP.');
      return false;
    }

    const duplicate = this.images
      .find(img => img.name === file.name);

    if (duplicate) {
      const res = confirm('Ya existe una imagen con ese nombre. ¿Quieres sobrescribirla?');
      if (!res) return false;
    }

    return true;
  }

  private resetEditingState() {
    this.editingImg = null;

    if (this.input) {
      this.input.nativeElement.disabled = true;
      this.input = undefined;
    }
  }
}