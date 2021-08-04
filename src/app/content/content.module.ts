import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContentRoutingModule} from './content-routing.module';
import {HomeComponent} from './home/home.component';
import {AlbumComponent} from './album/album.component';
import {UploadSongComponent} from './upload-song/upload-song.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UploadedListComponent} from './uploaded-list/uploaded-list.component';
import {SongDetailComponent} from './song-detail/song-detail.component';
import {HttpClientModule} from '@angular/common/http';
import {PlaylistCreateComponent} from './playlist/playlist-create/playlist-create.component';
import {PlaylistListComponent} from './playlist/playlist-list/playlist-list.component';
import {PlaylistDetailComponent} from './playlist/playlist-detail/playlist-detail.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import { PlaylistEditComponent } from './playlist/playlist-edit/playlist-edit.component';
import { SongNewComponent } from './song/song-new/song-new.component';


@NgModule({
  declarations: [HomeComponent,
    AlbumComponent,
    UploadSongComponent,
    PlaylistCreateComponent,
    PlaylistListComponent,
    PlaylistDetailComponent,
    UploadedListComponent,
    SongDetailComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    PlaylistEditComponent,
    SongNewComponent],
  imports: [
    CommonModule,
    ContentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class ContentModule {
}
