import {Component, OnInit} from '@angular/core';
import {Song} from '../../../model/song';
import {UserToken} from '../../../model/user-token';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../../service/authentication/authentication.service';
import {NotificationService} from '../../../service/notification/notification.service';
import {SocketService} from '../../../service/socket/socket.service';
import {UserService} from '../../../service/user/user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SongService} from '../../../service/song/song.service';
import {User} from '../../../model/user';
import {SongInteraction} from '../../../model/song-interaction';
import {QueueService} from '../../../service/queue/queue.service';

declare var $: any;

@Component({
  selector: 'app-detail-song',
  templateUrl: './detail-song.component.html',
  styleUrls: ['./detail-song.component.css']
})
export class DetailSongComponent implements OnInit {
  URL = '/songs/detail/';
  song: Song = {};
  userToken: UserToken = {};
  commentForm: FormGroup = new FormGroup({
    comment: new FormControl('', [Validators.required])
  });
  comments: SongInteraction[];
  page = 0;
  size = 5;
  scrollPercent = 0.796;

  constructor(private activatedRouter: ActivatedRoute,
              private songService: SongService,
              private router: Router,
              private authenticationService: AuthenticationService,
              private notificationService: NotificationService, private socketService: SocketService,
              private userService: UserService, private queueService: QueueService) {
    this.activatedRouter.paramMap.subscribe(paramMap => {
      const id = +paramMap.get('id');
      this.getSongDetail(id);
      this.getSongComment(id);
    });
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.userToken = user;
    });
  }

  ngOnInit() {
    this.loadScript('/assets/js/menu-slider.js');
    this.loadScript('/assets/js/more-option.js');
    this.size = 5;
    this.checkScrollDownBottom();
    this.scrollPercent = 0.796;
  }

  // ngOnDestroy() {
  //   this.socketService.disconnect();
  // }

  public loadScript(url: string) {
    const body = document.body as HTMLDivElement;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  addFavourite() {

  }

  editSong() {

  }

  deleteSong() {

  }


  getSongDetail(id: number) {
    this.songService.findSongById(id).subscribe(song => {
      console.log(song);
      this.song = song;
    });
  }

  addComment() {
    this.commentForm.markAllAsTouched();
    if (this.userToken === null) {
      this.notificationService.showErrorMessage('Need to login first before comment');
    }
    if (this.commentForm.valid && this.userToken !== null) {
      this.songService.addSongComment(this.userToken.id, this.song.id,
        this.commentForm.value.comment).subscribe(songInteraction => {
        if (this.userToken.id !== this.song.user.id) {
          const notification = {
            sender: {
              id: this.userToken.id
            },
            recieverId: this.song.user.id,
            link: this.URL + this.song.id,
            content: this.commentForm.value.comment,
            action: 'commented on your song: ' + this.song.name
          };
          this.socketService.createNotificationUsingSocket(notification);
        }

        this.commentForm.reset();

        this.getSongComment(this.song.id);
      }, e => {
        console.log(e);
      });
    }
  }

  getSongComment(id: number) {
    this.songService.getSongComment(id, this.page, this.size).subscribe((comments: SongInteraction[]) => {
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
      if ($(window).scrollTop() + $(window).height() >= ($(document).height() * this.scrollPercent)) {
        $(window).scrollTop($(window).scrollTop() - 20);
        this.size += 5;
        this.getSongComment(this.song.id);
        this.scrollPercent += 0.017;
      }
    });
  }

  playSong(song: any) {
    const request = {
      title: 'play',
      song: song,
      songId: song.id
    };
    this.queueService.sendQueueRequest(request);
  }

  addToQueue(song: any) {
    const request = {
      title: 'add',
      song: song,
      songId: song.id
    };
    this.queueService.sendQueueRequest(request);
  }
}
