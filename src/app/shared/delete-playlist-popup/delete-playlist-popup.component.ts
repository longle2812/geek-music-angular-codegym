import { Component, OnInit } from '@angular/core';
import {UserToken} from '../../model/user-token';
import {SongService} from '../../service/song/song.service';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../service/notification/notification.service';
import {QueueService} from '../../service/queue/queue.service';
import {PlaylistService} from '../../service/playlist/playlist.service';
declare var $: any;
@Component({
  selector: 'app-delete-playlist-popup',
  templateUrl: './delete-playlist-popup.component.html',
  styleUrls: ['./delete-playlist-popup.component.css']
})
export class DeletePlaylistPopupComponent implements OnInit {
  currentUser: UserToken = {};

  constructor(private playlistService: PlaylistService,
              private authenticationService: AuthenticationService,
              private router: Router,
              private notificationService: NotificationService,
              private queueService: QueueService) {
    this.authenticationService.currentUserSubject.subscribe(
      user => this.currentUser = user
    );
  }
  ngOnInit() {
    this.loadScript('/assets/js/delete-playlist.js');
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
  deletePlaylist(element: HTMLAnchorElement) {
    const playId = element.getAttribute('data-playlist-id');
    this.playlistService.delete(Number(playId)).subscribe(
      () => {
        this.notificationService.showSuccessMessage("Delete Successfully");
        $('#delete-playlist-confirm').modal('hide');
        this.router.navigateByUrl("/playlist/list")
        // this.reloadCurrentRoute();
        // $('#jquery_jplayer_1').jPlayer("clearMedia");
        // const request = {
        //   title: 'delete',
        //   playlist: undefined,
        //   playId: playId
        // };
        // this.queueService.sendQueueRequest(request);
      },
      () => {this.notificationService.showErrorMessage("Something's wrong..")}
    );
  }

  // reloadCurrentRoute() {
  //   const currentUrl = this.router.url;
  //   this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
  //     this.router.navigate([currentUrl]);
  //     console.log(currentUrl);
  //   });
  // }
}
