import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user/user.service';
import {User} from '../../model/user';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {UserToken} from '../../model/user-token';
import {SongService} from '../../service/song/song.service';
import {SocketService} from '../../service/socket/socket.service';
import {NotificationService} from '../../service/notification/notification.service';
declare var $: any;

@Component({
  selector: 'app-share-song',
  templateUrl: './share-song.component.html',
  styleUrls: ['./share-song.component.css']
})

export class ShareSongComponent implements OnInit {
  URL = "/songs/detail/";
  users: User[] = [];
  userToken: UserToken = {};
  songId: number;
  constructor(private userService: UserService, private authenticationService: AuthenticationService,
              private songService: SongService,
              private socketService: SocketService,
              private notificationService: NotificationService) {
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.userToken = user;
      this.getAllUser();
    });
  }

  ngOnInit() {
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.userToken = user;
      this.getAllUser();
    });
  }

  close() {
    $('#share-song').hide();
  }

  private getAllUser() {
    this.userService.findAll().subscribe(userList =>{
        this.users = userList;
      }
    )
  }

  shareSong() {
    const receiverId = $('#share-song-id').find(":selected").val();
    this.songService.currentSongId.subscribe(songId =>
      this.songId = songId
    )
    this.songService.getSongById(this.songId).subscribe(song =>{
      const notification = {
        sender: {
          id: this.userToken.id
        },
        recieverId: receiverId,
        link: this.URL + this.songId,
        action: 'share a song with you: Listen Now '
      };
      if (receiverId != song.userId){
        this.socketService.createNotificationUsingSocket(notification);
        this.notificationService.showSuccessMessage("Share link successfully");
      }
    })


  }
}
