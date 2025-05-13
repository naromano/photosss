import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-upload-photo',
  standalone: false,
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.css']
})
export class UploadPhotoComponent implements OnInit {

  imagen: any = null;
  mostrarOpciones = false;
  isUploading = false;
  progress = 0;

  @ViewChild('inputCamara') inputCamara!: ElementRef<HTMLInputElement>;
  @ViewChild('inputGaleria') inputGaleria!: ElementRef<HTMLInputElement>;

  constructor(private storage: StorageService) {}

  ngOnInit(): void {}

  subirFoto(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    this.isUploading = true;
    this.progress = 0;

    console.log("Subiendo imagen...");

    this.storage.subirImagenConProgreso(file.name + '-' + Date.now(), file, (p: number) => {
      this.progress = Math.round(p);
    }).then(url => {
      this.isUploading = false;
      this.progress = 0;

      if (url) {
        alert("¡Foto subida con éxito!");
      } else {
        alert("Hubo un error al subir la imagen.");
      }
    });

    this.mostrarOpciones = false;
  }

  abrirCamara() {
    this.mostrarOpciones = false;
    this.inputCamara.nativeElement.click();
  }

  abrirGaleria() {
    this.mostrarOpciones = false;
    this.inputGaleria.nativeElement.click();
  }
}
