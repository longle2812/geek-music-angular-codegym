import {Component, OnInit} from '@angular/core';
import {Playlist} from '../../../model/playlist';
import {UserToken} from '../../../model/user-token';
import {PlaylistService} from '../../../service/playlist/playlist.service';
import {GenreService} from '../../../service/genres/genre.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {AuthenticationService} from '../../../service/authentication/authentication.service';
import {ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {NotificationService} from '../../../service/notification/notification.service';

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
              private authenticationService: AuthenticationService,
              private router: Router,
              private notificationService: NotificationService) {
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

  message() {
    this.notificationService.showErrorMessage('You must be logged in to create a new playlist');
  }
}
