import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AlbumComponent} from './album/album.component';
import {SingerCreateComponent} from './singer/singer-create/singer-create.component';
import {UploadSongComponent} from './upload-song/upload-song.component';
import {PlaylistCreateComponent} from './playlist/playlist-create/playlist-create.component';
import {PlaylistListComponent} from './playlist/playlist-list/playlist-list.component';
import {PlaylistDetailComponent} from './playlist/playlist-detail/playlist-detail.component';


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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule {
}
