import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadPhotoComponent } from './components/upload-photo/upload-photo.component';
import { ViewPhotosComponent } from './components/view-photos/view-photos.component';

const routes: Routes = [
  { path: 'upload', component: UploadPhotoComponent },
  { path: 'view', component: ViewPhotosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
