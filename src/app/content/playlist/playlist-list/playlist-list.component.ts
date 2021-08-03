import {Component, OnInit} from '@angular/core';
import {Playlist} from '../../../model/playlist';
import {UserToken} from '../../../model/user-token';
import {PlaylistService} from '../../../service/playlist/playlist.service';
import {GenreService} from '../../../service/genres/genre.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {AuthenticationService} from '../../../service/authentication/authentication.service';

@Component({
  selector: 'app-playlist-list',
  templateUrl: './playlist-list.component.html',
  styleUrls: ['./playlist-list.component.css']
})
export class PlaylistListComponent implements OnInit {
  playlists: Playlist[] = [];
  userToken: UserToken = {};
  constructor(private playlistService: PlaylistService,
              private genreService: GenreService,
              private authenticationService: AuthenticationService) {
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.userToken = user;
    });
  }

  ngOnInit() {
    this.getAllPlaylist();

  }

  private getAllPlaylist() {
    if(this.userToken != null){
      this.playlistService.getAllPlaylistBuyUser(this.userToken.id).subscribe(list => {
        this.playlists = list;
      });
    }

  }

  delete(playlistId: number,userId: number) {
    if(this.userToken.id == userId ){
      let isDelete = confirm('Delete playlist?');
      if(isDelete){
        this.playlistService.delete(playlistId).subscribe(() =>{
          this.getAllPlaylist();
        });
      }
    }else {
      alert('you don\'t have permission')
    }
  }
}
