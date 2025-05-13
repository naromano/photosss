import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { environment } from '../environments/environments';
import { initializeApp } from 'firebase/app';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import Compressor from 'compressorjs';

firebase.initializeApp(environment.firebaseConfig);

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  storage = firebase.app().storage().ref();

  constructor(private firestore: Firestore) {}

  // Método original (sin progreso)
  async subirImagen(name: string, img: any) {
    try {
      const compressedImage = await this.compressImage(img);
      const response = await this.storage.child("Photos/" + name).put(compressedImage);
      const url: string = await response.ref.getDownloadURL();
      await this.addphoto(url);
      return url;
    } catch (error) {
      console.error("Error uploading image: ", error);
      return null;
    }
  }

  // ✅ Nuevo método con progreso
  async subirImagenConProgreso(name: string, img: any, onProgress: (p: number) => void): Promise<string | null> {
    try {
      const compressedImage = await this.compressImage(img);
      const uploadTask = this.storage.child("Photos/" + name).put(compressedImage);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            onProgress(progress);
          },
          (error) => {
            console.error("Error durante la subida:", error);
            reject(null);
          },
          async () => {
            const url = await uploadTask.snapshot.ref.getDownloadURL();
            await this.addphoto(url);
            resolve(url);
          }
        );
      });
    } catch (error) {
      console.error("Error al comprimir/subir la imagen:", error);
      return null;
    }
  }

  // Comprime la imagen usando Compressor.js
  private compressImage(img: any): Promise<any> {
    return new Promise((resolve, reject) => {
      new Compressor(img, {
        quality: 0.6,
        success(result) {
          resolve(result);
        },
        error(err) {
          reject(err);
        }
      });
    });
  }

  // Guarda la URL en Firestore
  addphoto(url: string) {
    const photoReF = collection(this.firestore, 'Photos');
    return addDoc(photoReF, { url });
  }

  // Devuelve observable con todas las fotos
  getPhotos() {
    const photoReF = collection(this.firestore, 'Photos');
    return collectionData(photoReF);
  }
}
