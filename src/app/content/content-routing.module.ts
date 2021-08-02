import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AlbumComponent} from './album/album.component';
import {UploadSongComponent} from './upload-song/upload-song.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';


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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule {
}
