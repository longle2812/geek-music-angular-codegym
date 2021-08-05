import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AlbumComponent} from './album/album.component';
import {SingerCreateComponent} from './singer/singer-create/singer-create.component';
import {UploadSongComponent} from './upload-song/upload-song.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {UploadedListComponent} from './uploaded-list/uploaded-list.component';
import {SongDetailComponent} from './song-detail/song-detail.component';
import {PlaylistCreateComponent} from './playlist/playlist-create/playlist-create.component';
import {PlaylistListComponent} from './playlist/playlist-list/playlist-list.component';
import {PlaylistDetailComponent} from './playlist/playlist-detail/playlist-detail.component';
import {TopSongComponent} from './top-song/top-song.component';


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
    path: 'users/:id',
    component: EditProfileComponent
  },
  {
    path: 'users/pw/:id',
    component: ChangePasswordComponent
  },
  {
    path: 'uploaded-list',
    component: UploadedListComponent
  },
  {
    path: 'song/:id',
    component: SongDetailComponent
  }
  ,
  {
    path: 'playlist/create',
    component: PlaylistCreateComponent
  },
  {
    path: 'playlist/list',
    component: PlaylistListComponent
  }
  ,
  {
    path: 'playlist/:id',
    component: PlaylistDetailComponent
  },
  {
    path: 'toplisten',
    component: TopSongComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule {
}
