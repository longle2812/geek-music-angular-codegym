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
import {TopSongComponent} from './top-song/top-song.component';
import {PlaylistEditComponent} from './playlist/playlist-edit/playlist-edit.component';
import {NewSongComponent} from './song/new-songs/new-song.component';
import {NewReleasesComponent} from './home/new-releases/new-releases.component';
import {PlaylistSearchComponent} from './playlist/playlist-search/playlist-search.component';
import {SongSearchComponent} from './song-search/song-search.component';
import {PopupDeletePlaylistComponent} from './playlist/playlist-detail/popup-delete-playlist/popup-delete-playlist.component';
import {SingerCreateComponent} from './singer/singer-create/singer-create.component';
import { SingerListComponent } from './singer/singer-list/singer-list.component';
import { SingerDetailComponent } from './singer/singer-detail/singer-detail.component';


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
    TopSongComponent,
    PlaylistEditComponent,
    NewSongComponent,
    NewReleasesComponent,
    PlaylistSearchComponent,
    SongSearchComponent,
    PopupDeletePlaylistComponent,
    SingerCreateComponent,
    SingerListComponent,
    SingerDetailComponent
  ],
  exports: [
    PopupDeletePlaylistComponent,
  ],
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
