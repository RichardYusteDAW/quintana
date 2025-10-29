import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { VideoService } from '../../../../services/video/video.service';
import { Video } from '../../../../models/Video';
import { EditingVideo } from '../../../../models/EditingVideo';

@Component({
  selector: 'app-admin-videos',
  imports: [FormsModule],
  templateUrl: './admin-videos.component.html',
  styleUrl: './admin-videos.component.css'
})
export class AdminVideosComponent {
  @ViewChildren('videoNameInput') videoNameInputs!: QueryList<ElementRef<HTMLInputElement>>;
  @ViewChildren('videoIdInput') videoIdInputs!: QueryList<ElementRef<HTMLInputElement>>;
  videoNameInput?: ElementRef<HTMLInputElement>;
  videoIdInput?: ElementRef<HTMLInputElement>;

  videos: Video[] = [];
  newVideo: Video | null = null;
  editingVideo: EditingVideo | null = null;

  constructor(private videoService: VideoService) { }

  ngOnInit() {
    this.getAllVideos();
  }


  /********** PUBLIC **********/
  /*ADDING*/
  public startAdd() {
    this.newVideo = { id: '', name: '' };
  }

  public cancelAdd() {
    this.newVideo = null;
  }

  public saveAdd() {
    if (!this.newVideo) {
      this.cancelAdd();
      return;
    }

    const videoName = this.newVideo.name;
    const videoId = this.newVideo.id;
    if (!this.checkAddVideo(videoName, videoId)) return;

    this.videos.push({ id: videoId, name: videoName });

    this.videoService.upload(this.videos).subscribe({
      next: () => this.newVideo = null,
      error: err => console.error('Error al agregar el video:', err)
    });
  }

  /*EDITING*/
  public startEdit(video: Video, index: number) {
    this.editingVideo = {
      oldId: video.id,
      newId: '',
      oldName: video.name,
      newName: ''
    };

    setTimeout(() => {
      this.videoNameInput = this.videoNameInputs.get(index);
      this.videoIdInput = this.videoIdInputs.get(index);

      if (this.videoNameInput) {
        const el = this.videoNameInput.nativeElement;
        el.disabled = false;
        el.focus();
        el.select();
      }

      if (this.videoIdInput) {
        this.videoIdInput.nativeElement.disabled = false;
      }
    });
  }

  public cancelEdit() {
    this.videoNameInput!.nativeElement.value = this.editingVideo!.oldName;
    this.videoIdInput!.nativeElement.value = this.editingVideo!.oldId;
    this.resetEditingState();
  }

  public saveEdit() {
    const videoName = this.videoNameInput!.nativeElement.value;
    const videoId = this.videoIdInput!.nativeElement.value;

    if (!this.checkUpdateVideo(videoName, videoId)) return;

    const videoIndex = this.videos.findIndex(v => v.id === this.editingVideo!.oldId);
    if (videoIndex !== -1) {
      this.videos[videoIndex].name = videoName;
      this.videos[videoIndex].id = videoId;
    }

    this.videoService.upload(this.videos).subscribe({
      next: () => this.resetEditingState(),
      error: err => console.error('Error al actualizar el video:', err)
    });
  }

  public onDeleteVideo(videoId: string) {

    const res = confirm('¿Estás seguro de que deseas eliminar este video? Esta acción no se puede deshacer.');
    if (!res) return;

    this.videoService.delete(videoId).subscribe({
      next: () => this.videos = this.videos.filter(v => v.id !== videoId),
      error: err => console.error('Error al eliminar el video:', err)
    });
  }


  /********** PRIVATE **********/
  private getAllVideos() {
    this.videoService.getAll().subscribe({
      next: res => this.videos = res,
      error: err => console.error('Error al obtener los videos:', err)
    });
  }

  private checkAddVideo(videoName: string, videoId: string): boolean {
    // Check empty name
    const trimName = videoName.trim();
    if (trimName === '') {
      alert('El nombre del video no puede estar vacío.');
      return false;
    }
    const trimId = videoId.trim();
    if (trimId === '') {
      alert('El ID del video no puede estar vacío.');
      return false;
    }

    // Check duplicate name
    const duplicateName = this.videos.find(v => v.name === trimName);
    if (duplicateName) {
      alert('Ya existe un video con ese nombre. Por favor, elige otro.');
      return false;
    }

    // Check duplicate ID
    const duplicateId = this.videos.find(v => v.id === trimId);
    if (duplicateId) {
      alert('Ya existe un video con ese ID. Por favor, elige otro.');
      return false;
    }

    return true;
  }

  private checkUpdateVideo(videoName: string, videoId: string): boolean {
    // Check empty name
    const trimName = videoName.trim();
    if (trimName === '') {
      alert('El nombre del video no puede estar vacío.');
      return false;
    }
    const trimId = videoId.trim();
    if (trimId === '') {
      alert('El ID del video no puede estar vacío.');
      return false;
    }

    // Check if nothing changed
    if (this.editingVideo!.oldName === trimName && this.editingVideo!.oldId === trimId) {
      this.resetEditingState();
      return false;
    }

    // Check duplicate name (excluding the current video)
    const duplicateName = this.videos.find(v => v.name === trimName && v.id !== this.editingVideo!.oldId);
    if (duplicateName) {
      alert('Ya existe un video con ese nombre. Por favor, elige otro.');
      return false;
    }

    // Check duplicate ID (excluding the current video)
    const duplicateId = this.videos.find(v => v.id === trimId && v.id !== this.editingVideo!.oldId);
    if (duplicateId) {
      alert('Ya existe un video con ese ID. Por favor, elige otro.');
      return false;
    }

    return true;
  }

  private resetEditingState() {
    this.editingVideo = null;

    if (this.videoNameInput) {
      this.videoNameInput.nativeElement.disabled = true;
      this.videoNameInput = undefined;
    }

    if (this.videoIdInput) {
      this.videoIdInput.nativeElement.disabled = true;
      this.videoIdInput = undefined;
    }
  }
}