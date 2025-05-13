import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { environment } from '../environments/environments';
import { initializeApp } from 'firebase/app';
import {
  collection,
  Firestore,
  addDoc,
  collectionData,
  deleteDoc, doc, updateDoc, docData 
} from '@angular/fire/firestore';
firebase.initializeApp(environment.firebaseConfig);

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  storage = firebase.app().storage().ref();

  constructor(private firestore: Firestore) { }


 async subirImagen(name: string, img:any){

  try {
    const response = await this.storage.child("Photos/"+name).putString(img, 'data_url');
    const url: String = await response.ref.getDownloadURL();
    await this.addphoto(url);
    return url;

  }catch (error) {
    console.error("Error uploading image: ", error);
    return null;
  }
}

addphoto(url: any) {
    const photoReF =  collection(this.firestore, 'Photos');
    return addDoc(photoReF, { url });
  }

  getPhotos() {
    const photoReF =  collection(this.firestore, 'Photos');
    return collectionData(photoReF);
  }
}