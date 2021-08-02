import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AlbumComponent} from './album/album.component';
import {UploadSongComponent} from './upload-song/upload-song.component';
import {UploadedListComponent} from './uploaded-list/uploaded-list.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'album',
    component: AlbumComponent
  },
  {
    path: 'upload',
    component: UploadSongComponent
  },
  {
    path: 'uploaded-list',
    component: UploadedListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
