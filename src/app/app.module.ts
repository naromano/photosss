import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { UploadPhotoComponent } from './components/upload-photo/upload-photo.component';
import { ViewPhotosComponent } from './components/view-photos/view-photos.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadPhotoComponent,
    ViewPhotosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [provideFirebaseApp(() =>
      initializeApp({
        apiKey: "AIzaSyBd26BCEWfj0gMdVwIaYS2vwwphLGURg_k",
  authDomain: "weeding-photos-beb42.firebaseapp.com",
  projectId: "weeding-photos-beb42",
  storageBucket: "weeding-photos-beb42.firebasestorage.app",
  messagingSenderId: "931398652030",
  appId: "1:931398652030:web:f5e33d97caef9bcb31c82f"
      })
    ),
    provideFirestore(() => getFirestore()),
    provideAnimationsAsync(),],
  bootstrap: [AppComponent]
})
export class AppModule { }
