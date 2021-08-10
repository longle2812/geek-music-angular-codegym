import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PlaylistService} from '../../../service/playlist/playlist.service';
import {Playlist} from '../../../model/playlist';
import {AuthenticationService} from '../../../service/authentication/authentication.service';
import {UserToken} from '../../../model/user-token';
import {NotificationService} from '../../../service/notification/notification.service';
import {SocketService} from '../../../service/socket/socket.service';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.css']
})
export class PlaylistDetailComponent implements OnInit, OnDestroy {
  playlist: Playlist = {};
  userToken: UserToken ={};
  notifications: Notification[] = [];
  constructor(private activatedRouter: ActivatedRoute,
              private playlistService: PlaylistService,
              private router: Router,
              private authenticationService: AuthenticationService,
              private notificationService: NotificationService, private socketService: SocketService
              ) {
    this.activatedRouter.paramMap.subscribe(paramMap => {
      const id = paramMap.get('id');
      this.getPlaylist(Number(id));
    });
    this.authenticationService.currentUserSubject.subscribe(user =>{
      this.userToken = user;
    })

  }

  ngOnInit() {
    this.loadScript('/assets/js/menu-slider.js');
    this.loadScript('/assets/js/more-option.js');
  }

  ngOnDestroy() {
  }

  private getPlaylist(id) {
    this.playlistService.getPlaylist(id).subscribe(playlist => {
      this.playlist = playlist;
    });
  }


  public loadScript(url: string) {
    const body = document.body as HTMLDivElement;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  deletePlaylist() {
    if(this.userToken.id == this.playlist.user.id){
      let isConfirm = confirm('Confirm delete playlist');
      if(isConfirm){
        this.playlistService.delete(this.playlist.id).subscribe(() =>{
            this.notificationService.showSuccessMessage("Delete success");
            this.router.navigateByUrl('/playlist/list');
          },
          () =>{
            this.notificationService.showErrorMessage("Delete error")
          });
      }
    }else {
      this.notificationService.showErrorMessage('you have no authority for this' );
    }
  }

  editPlaylist() {
    if(this.userToken.id == this.playlist.user.id){
      this.router.navigateByUrl('/playlist/edit/'+this.playlist.id);
    }else {
      this.notificationService.showErrorMessage('you have no authority for this' );
    }
  }

  createNotification(playlist: Playlist) {

    const notification = {
      sender: {
        id: this.userToken.id
      },
      recieverId: playlist.user.id,
      content: "test",
      action: "comment to your playlist: " + playlist.name
    }
    this.socketService.createNotificationUsingSocket(notification);
  }
}
