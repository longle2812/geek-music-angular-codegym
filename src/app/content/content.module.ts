import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentRoutingModule } from './content-routing.module';
import { HomeComponent } from './home/home.component';
import { AlbumComponent } from './album/album.component';
import { UploadSongComponent } from './upload-song/upload-song.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { PlaylistCreateComponent } from './playlist/playlist-create/playlist-create.component';
import { PlaylistListComponent } from './playlist/playlist-list/playlist-list.component';
import { PlaylistDetailComponent } from './playlist/playlist-detail/playlist-detail.component';


@NgModule({
  declarations: [HomeComponent, AlbumComponent, UploadSongComponent, PlaylistCreateComponent, PlaylistListComponent, PlaylistDetailComponent],
  imports: [
    CommonModule,
    ContentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ContentModule { }
