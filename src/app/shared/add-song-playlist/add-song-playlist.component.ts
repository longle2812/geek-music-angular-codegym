import { Component, OnInit } from '@angular/core';
import {PlaylistService} from '../../service/playlist/playlist.service';
import {PlaylistDTO} from '../../model/playlist-dto';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {UserToken} from '../../model/user-token';
import {SongService} from '../../service/song/song.service';
import {NotificationService} from '../../service/notification/notification.service';
declare var $: any;

@Component({
  selector: 'app-add-song-playlist',
  templateUrl: './add-song-playlist.component.html',
  styleUrls: ['./add-song-playlist.component.css']
})
export class AddSongPlaylistComponent implements OnInit {
  playlists: PlaylistDTO[] = [];
  userToken: UserToken = {};
  songId: number;

  constructor(private playlistService: PlaylistService,
              private authenticationService: AuthenticationService,
              private songService: SongService,
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

  close() {
    $('#add-song').hide();
  }

  addSong() {
    const playListId = $('#add-song-playlist').find(":selected").val();
    this.songService.currentSongId.subscribe(songId =>
        this.songId = songId
    )
    this.songService.addSongToPlayList(this.songId,playListId).subscribe( () =>
      this.notificationService.showSuccessMessage("ngon")
    )
  }
}
