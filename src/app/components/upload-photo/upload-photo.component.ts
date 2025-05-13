import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-upload-photo',
  standalone: false,
  templateUrl: './upload-photo.component.html',
  styleUrl: './upload-photo.component.css'
})
export class UploadPhotoComponent implements OnInit {

  

  constructor(private storage: StorageService) {}
  ngOnInit(): void {
  }

   imagen : any = null;

  subirFoto(event: any) {
    const file = event.target.files[0];
    let reader = new FileReader();
    

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const urlPhoto = this.storage.subirImagen(file.name + "-" + Date.now(), reader.result);
      console.log(urlPhoto);
      
    }
  }


}

