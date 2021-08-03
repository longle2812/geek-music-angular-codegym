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
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {ChangePasswordComponent} from './change-password/change-password.component';


@NgModule({
  declarations: [HomeComponent,
    AlbumComponent,
    UploadSongComponent,
    UploadedListComponent,
    SongDetailComponent,
    EditProfileComponent,
    ChangePasswordComponent],
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
