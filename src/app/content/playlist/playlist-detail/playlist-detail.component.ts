import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PlaylistService} from '../../../service/playlist/playlist.service';
import {Playlist} from '../../../model/playlist';
import {AuthenticationService} from '../../../service/authentication/authentication.service';
import {UserToken} from '../../../model/user-token';
import {NotificationService} from '../../../service/notification/notification.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PlaylistInteraction} from '../../../model/playlist-interaction';
import {UserService} from '../../../service/user/user.service';
import {User} from '../../../model/user';

declare var $: any;

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.css']
})
export class PlaylistDetailComponent implements OnInit {
  playlist: Playlist = {};
  userToken: UserToken = {};
  commentForm: FormGroup = new FormGroup({
    comment: new FormControl('', [Validators.required])
  });
  comments: PlaylistInteraction[];

  constructor(private activatedRouter: ActivatedRoute,
              private playlistService: PlaylistService,
              private router: Router,
              private authenticationService: AuthenticationService,
              private notificationService: NotificationService,
              private userService: UserService
  ) {
    this.activatedRouter.paramMap.subscribe(paramMap => {
      const id = paramMap.get('id');
      this.getPlaylist(Number(id));
      this.getPlaylistComment(Number(id));
    });
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.userToken = user;
    });
  }

  ngOnInit() {
    this.loadScript('/assets/js/menu-slider.js');
    this.loadScript('/assets/js/more-option.js');
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
    if (this.userToken.id === this.playlist.user.id) {
      const isConfirm = confirm('Confirm delete playlist');
      if (isConfirm) {
        this.playlistService.delete(this.playlist.id).subscribe(() => {
            this.notificationService.showSuccessMessage('Delete success');
            this.router.navigateByUrl('/playlist/list');
          },
          () => {
            this.notificationService.showErrorMessage('Delete error');
          });
      }
    } else {
      this.notificationService.showErrorMessage('you have no authority for this');
    }
  }

  editPlaylist() {
    if (this.userToken.id === this.playlist.user.id) {
      this.router.navigateByUrl('/playlist/edit/' + this.playlist.id);
    } else {
      this.notificationService.showErrorMessage('you have no authority for this');
    }
  }

  addComment() {
    this.commentForm.markAllAsTouched();
    if (this.userToken === null) {
      this.notificationService.showErrorMessage('Need to login first before comment');
    }
    if (this.commentForm.valid && this.userToken !== null) {
      this.playlistService.addPlaylistComment(this.userToken.id, this.playlist.id,
        this.commentForm.value.comment).subscribe(playlistInteraction => {
        this.commentForm.reset();
        this.getPlaylistComment(this.playlist.id);
      }, e => {
        console.log(e);
      });
    }
  }

  getPlaylistComment(id: number) {
    this.playlistService.getPlaylistComment(id).subscribe((comments: PlaylistInteraction[]) => {
      this.comments = comments;
      for (let i = 0; i < this.comments.length; i++) {
        const currentComment = this.comments[i];
        const a = new Date(currentComment.createdAt);
        a.setMonth(a.getMonth() + 1);
        currentComment.createdAt = a.getDate() + '-' + a.getMonth() + '-' + a.getFullYear();
        this.userService.findById(currentComment.senderId).subscribe((sender: User) => {
          console.log(sender);
          currentComment.sender = sender;
        });
      }
    }, e => {
      console.log(e);
    });
  }
}
