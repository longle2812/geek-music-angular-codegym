import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PlaylistService} from '../../../service/playlist/playlist.service';
import {Playlist} from '../../../model/playlist';
import {AuthenticationService} from '../../../service/authentication/authentication.service';
import {UserToken} from '../../../model/user-token';
import {NotificationService} from '../../../service/notification/notification.service';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.css']
})
export class PlaylistDetailComponent implements OnInit {
  playlist: Playlist = {};
  userToken: UserToken ={};
  constructor(private activatedRouter: ActivatedRoute,
              private playlistService: PlaylistService,
              private router: Router,
              private authenticationService: AuthenticationService,
              private notificationService: NotificationService
              ) {
    this.activatedRouter.paramMap.subscribe(paramMap => {
      const id = paramMap.get('id');
      this.getPlaylist(id);
    });
    this.authenticationService.currentUserSubject.subscribe(user =>{
      this.userToken = user;
    })

  }


  ngOnInit() {
    this.loadScript('/assets/js/menu-slider.js');
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

  delete(element: HTMLAnchorElement) {
    const playlistId = element.getAttribute('data-playlist-id');

      this.playlistService.delete(Number(playlistId)).subscribe(() =>{
        this.router.navigateByUrl('/playlist/list');
        this.notificationService.showSuccessMessage("Delete Successfully");
        $('#deletePlaylistModal').modal('hide');
      });

  }
}
