import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user';
import {UserToken} from '../../model/user-token';
import {UserService} from '../../service/user/user.service';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {SongService} from '../../service/song/song.service';
import {SocketService} from '../../service/socket/socket.service';
import {NotificationService} from '../../service/notification/notification.service';
import {PlaylistService} from '../../service/playlist/playlist.service';
declare var $:any;

@Component({
  selector: 'app-share-playlist',
  templateUrl: './share-playlist.component.html',
  styleUrls: ['./share-playlist.component.css']
})
export class SharePlaylistComponent implements OnInit {
  URL = "/playlist/";
  users: User[] = [];
  userToken: UserToken = {};
  playlistId: number;
  constructor(private userService: UserService, private authenticationService: AuthenticationService,
              private songService: SongService,
              private socketService: SocketService,
              private notificationService: NotificationService,
              private playlistService: PlaylistService) {
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.userToken = user;
      this.getAllUser();
    });
  }

  ngOnInit() {
  }

  close() {
    $('#share-playlist').hide();
  }

  shareSong() {
    const receiverId = $('#share-playlist-id').find(":selected").val();
    this.playlistService.currentPlaylistSubject.subscribe(playlistId =>
      this.playlistId = playlistId
    )
    this.playlistService.getPlaylist(this.playlistId).subscribe(playlist =>{
      const notification = {
        sender: {
          id: this.userToken.id
        },
        recieverId: receiverId,
        link: this.URL + this.playlistId,
        action: 'share a playlist with you: Listen Now '
      };
      if (receiverId != playlist.user && receiverId != this.userToken.id){
        this.socketService.createNotificationUsingSocket(notification);
        this.notificationService.showSuccessMessage("Share link successfully");
      }
    })


  }

  private getAllUser() {
    this.userService.findAll().subscribe(userList =>{
        this.users = userList;
      }
    )
  }
}
