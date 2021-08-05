import {Component, OnInit} from '@angular/core';
import {SongService} from '../../service/song/song.service';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {UserToken} from '../../model/user-token';
import {Router} from '@angular/router';
import {NotificationService} from '../../service/notification/notification.service';

declare var $: any;
@Component({
  selector: 'app-delete-song-popup',
  templateUrl: './delete-song-popup.component.html',
  styleUrls: ['./delete-song-popup.component.css']
})
export class DeleteSongPopupComponent implements OnInit {
  currentUser: UserToken = {};

  constructor(private songService: SongService,
              private authenticationService: AuthenticationService,
              private router: Router,
              private notificationService: NotificationService) {
    this.authenticationService.currentUserSubject.subscribe(
      user => this.currentUser = user
    );
  }

  ngOnInit() {
    this.loadScript('/assets/js/delete-song.js');
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

  deleteSong(element: HTMLAnchorElement) {
    const songId = element.getAttribute('data-song-id');
    this.songService.deleteSongByIdAndUserId(Number(songId), this.currentUser.id).subscribe(
      () => {
        this.notificationService.showSuccessMessage("Delete Successfully");
        $('#delete-confirm').modal('hide');
        this.reloadCurrentRoute();
      },
      () => {this.notificationService.showErrorMessage("Something's wrong..")}
    );
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
      console.log(currentUrl);
    });
  }
}
