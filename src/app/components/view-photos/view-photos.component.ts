import { Component, OnInit, OnDestroy } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-view-photos',
  standalone: false,
  templateUrl: './view-photos.component.html',
  styleUrl: './view-photos.component.css'
})
export class ViewPhotosComponent implements OnInit, OnDestroy {
  photos: any[] = [];
  currentPhotoUrl: string = '';
  private photoInterval: any;
  private subscription: Subscription = new Subscription();
  animationKey: number = 0;  // Clave para reiniciar la animación

  constructor(private storage: StorageService) {}

  ngOnInit(): void {
    this.getPhotos();
    this.startSlideshow();
  }

  ngOnDestroy(): void {
    clearInterval(this.photoInterval);   // Limpiamos el intervalo cuando se destruye el componente
    this.subscription.unsubscribe();
  }

  getPhotos(): void {
    const sub = this.storage.getPhotos().subscribe((data: any[]) => {
      this.photos = data;
      console.log(this.photos);
      if (this.photos.length && !this.currentPhotoUrl) {
        this.setRandomPhoto();
      }
    });
    this.subscription.add(sub);
  }

  startSlideshow(): void {
    this.photoInterval = setInterval(() => {
      if (this.photos.length > 0) {
        this.setRandomPhoto();
      }
    }, 5000); // Cambia cada 5 segundos
  }

  setRandomPhoto(): void {
    const randomIndex = Math.floor(Math.random() * this.photos.length);
    this.currentPhotoUrl = this.photos[randomIndex].url;
    this.animationKey++;  // Incrementamos para reiniciar la animación
  }
}