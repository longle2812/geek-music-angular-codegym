import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PlaylistService} from '../../../service/playlist/playlist.service';
import {Playlist} from '../../../model/playlist';
import {AuthenticationService} from '../../../service/authentication/authentication.service';
import {UserToken} from '../../../model/user-token';
import {NotificationService} from '../../../service/notification/notification.service';
import {SocketService} from '../../../service/socket/socket.service';
import {PlaylistInteraction} from '../../../model/playlist-interaction';
import {PlaylistInteractionService} from '../../../service/playlistInteration/playlist-interaction.service';
import {PlaylistInteractionDTO} from '../../../model/playlist-interaction-dto';
import {BehaviorSubject, Observable} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../service/user/user.service';
import {User} from '../../../model/user';

declare var $: any;

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.css']
})
export class PlaylistDetailComponent implements OnInit, OnDestroy {
  playlist: Playlist = {};
  userToken: UserToken ={};
  notifications: Notification[] = [];
  interactionId: number = -1;
  playlistId: number =-1;
  interactionDTO: PlaylistInteractionDTO = {};
  public playlistInteractionsSubject:  BehaviorSubject<PlaylistInteraction[]>;
  public currentPlaylistInteraction: Observable<PlaylistInteraction[]>;
  commentForm: FormGroup = new FormGroup({
    comment: new FormControl('', [Validators.required])
  });
  comments: PlaylistInteraction[];
  page = 0;
  size = 5;

  constructor(private activatedRouter: ActivatedRoute,
              private playlistService: PlaylistService,
              private router: Router,
              private authenticationService: AuthenticationService,
              private notificationService: NotificationService, private socketService: SocketService,
              private playlistInteractionService: PlaylistInteractionService, private userService: UserService) {
    this.activatedRouter.paramMap.subscribe(paramMap => {
      this.playlistId = Number(paramMap.get('id'));
      this.getPlaylist(this.playlistId);
      const id = paramMap.get('id');
      this.getPlaylist(Number(id));
      this.getPlaylistComment(Number(id));
    });
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.userToken = user;
    });
    this.playlistInteractionService.getFavouriteByUserAndPlaylistId(this.userToken.id, this.playlistId).subscribe(interaction =>{
      if(interaction != null){
        this.interactionId = interaction.id
        this.interactionDTO = interaction;
      }else {
        if(this.userToken != null && this.playlist != null){
          this.interactionDTO.senderId = this.userToken.id;
          this.interactionDTO.playlistId = this.playlistId;
          this.interactionDTO.recieverId =  this.playlist.user.id;
          this.interactionDTO.comment = null;
          this.interactionDTO.link = null;
          this.interactionDTO.likes = false;
          this.interactionDTO.isRead = false;
        }

      }

    });

    this.playlistInteractionService.getFavouritesByPlaylistId(this.playlistId).subscribe(interactions => {
      this.playlistInteractionsSubject = new BehaviorSubject<PlaylistInteraction[]>(interactions);
      this.currentPlaylistInteraction = this.playlistInteractionsSubject.asObservable();
    })
  }

  ngOnInit() {
    this.loadScript('/assets/js/menu-slider.js');
    this.loadScript('/assets/js/more-option.js');
    this.checkScrollDownBottom();
  }

  ngOnDestroy() {
    this.socketService.disconnect();
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
    if (this.userToken.id == this.playlist.user.id) {
      let isConfirm = confirm('Confirm delete playlist');
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

  createNotification(playlist: Playlist) {
    if (this.userToken.id != playlist.user.id){
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
  addFavourite() {
    if(this.userToken != null){
      if (this.interactionId == -1) {
        this.interactionDTO.likes = true;
        this.playlistInteractionService.create(this.interactionDTO).subscribe(interaction => {
          this.interactionDTO = interaction;
          this.interactionId = interaction.id;
          this.playlistInteractionService.getFavouritesByPlaylistId(this.playlistId).subscribe(interactions => {
            this.playlistInteractionsSubject.next(interactions)
          })
        }, () => {
          alert(' like  error');
        });
      } else {
        this.interactionDTO.likes = !this.interactionDTO.likes;
        this.playlistInteractionService.update(this.interactionId, this.interactionDTO).subscribe(() => {
          this.playlistInteractionService.getFavouritesByPlaylistId(this.playlistId).subscribe(interactions => {
            this.playlistInteractionsSubject.next(interactions)
          })
        }, () => {
          alert(' unlike  error');
        });
      }
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
    this.playlistService.getPlaylistComment(id, this.page, this.size).subscribe((comments: PlaylistInteraction[]) => {
      this.comments = comments;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.comments.length; i++) {
        const currentComment = this.comments[i];
        const a = new Date(currentComment.createdAt);
        a.setMonth(a.getMonth() + 1);
        currentComment.createdAt = a.getDate() + '/' + a.getMonth() + '/' + a.getFullYear() + ' ' + a.getHours() + ':' + a.getMinutes();
        this.userService.findById(currentComment.senderId).subscribe((sender: User) => {
          currentComment.sender = sender;
        });
      }
    }, e => {
      console.log(e);
    });
  }

  checkScrollDownBottom() {
    $(window).scroll(() => {
      console.log($(window).scrollTop());
      console.log($(window).height());
      console.log($(document).height());
      if ($(window).scrollTop() + $(window).height() >= $(document).height() * 4 / 5) {
        this.size += 5;
        this.getPlaylistComment(this.playlist.id);
      }
    });
  }
}
