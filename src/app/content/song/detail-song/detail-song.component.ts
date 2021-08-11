import {Component, OnInit} from '@angular/core';
import {Song} from '../../../model/song';
import {UserToken} from '../../../model/user-token';
import {ActivatedRoute, Router} from '@angular/router';
import {PlaylistService} from '../../../service/playlist/playlist.service';
import {AuthenticationService} from '../../../service/authentication/authentication.service';
import {NotificationService} from '../../../service/notification/notification.service';
import {SocketService} from '../../../service/socket/socket.service';
import {PlaylistInteractionService} from '../../../service/playlistInteration/playlist-interaction.service';
import {UserService} from '../../../service/user/user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PlaylistInteraction} from '../../../model/playlist-interaction';
import {SongService} from '../../../service/song/song.service';
import {SingerInteractionDTO} from '../../../model/singer-interaction-dto';
import {BehaviorSubject, Observable} from 'rxjs';
import {SingerInteraction} from '../../../model/singer-interaction';
import {SongInteractionDto} from '../../../model/song-interaction-dto';

import {SongInteractionService} from '../../../service/song-interaction/song-interaction.service';
import {User} from '../../../model/user';
import {QueueService} from '../../../service/queue/queue.service';
import {SongInteraction} from '../../../model/song-interaction';
import {LabelService} from '../../../service/label/label.service';

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
  songLabels: string[] = [];

  interactionId: number = -1;
  songId: number = -1;
  interactionDTO: SongInteractionDto = {};

  public songInteractionsSubject: BehaviorSubject<SongInteraction[]>;
  public currentSongInteraction: Observable<SongInteraction[]>;

  constructor(private activatedRouter: ActivatedRoute,
              private songService: SongService,
              private router: Router,
              private authenticationService: AuthenticationService,
              private notificationService: NotificationService,
              private socketService: SocketService,
              private songInteractionService: SongInteractionService,
              private userService: UserService, private queueService: QueueService,
              private labelService: LabelService) {
    this.activatedRouter.paramMap.subscribe(paramMap => {
      const id = Number(paramMap.get('id'));
      this.songId = id;
      this.getSongDetail(id);
      this.getSongComment(id);
      this.getSongTags(id);
    });
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.userToken = user;
    });
    if (this.userToken != null && this.song != null) {
      this.getFavouriteByUserAndSong();
    }
    this.songInteractionService.getFavouritesBySong(this.songId).subscribe(interactions => {
      this.songInteractionsSubject = new BehaviorSubject<SongInteraction[]>(interactions);
      this.currentSongInteraction = this.songInteractionsSubject.asObservable();
    });
  }

  private getFavouriteByUserAndSong() {
    this.songInteractionService.getFavouriteByUserAndSong(this.userToken.id, this.songId).subscribe(interaction => {
      console.log('get uer and song');
      if (interaction != null) {
        this.interactionId = interaction.id;
        this.interactionDTO = interaction;
      } else {
        if (this.userToken != null && this.song != null) {
          this.interactionDTO.senderId = this.userToken.id;
          this.interactionDTO.songId = this.song.id;
          console.log('user >>>>>>>>>>>>>>>',this.song.user)
          this.interactionDTO.receiverId = this.song.user.id;
          this.interactionDTO.comment = null;
          this.interactionDTO.link = null;
          this.interactionDTO.likes = false;
          this.interactionDTO.isRead = false;
        }
      }
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
    if(this.userToken != null){
      if (this.interactionId == -1) {
        this.interactionDTO.likes = true;
        this.songInteractionService.create(this.interactionDTO).subscribe(interaction => {
          this.interactionDTO = interaction;
          this.interactionId = interaction.id;
          this.songInteractionService.getFavouritesBySong(this.songId).subscribe(interactions => {
            this.songInteractionsSubject.next(interactions);
            if (this.userToken.id !== this.song.user.id) {
              const notification = {
                sender: {
                  id: this.userToken.id
                },
                recieverId: this.song.user.id,
                content: '',
                link: this.URL + this.song.id,
                action: 'liked your song: ' + this.song.name
              };
              this.socketService.createNotificationUsingSocket(notification);
            }
          })
        }, () => {
          this.notificationService.showErrorMessage('Like error')
        });
      } else {
        this.interactionDTO.likes = !this.interactionDTO.likes;
        this.songInteractionService.update(this.interactionId, this.interactionDTO).subscribe(() => {
          this.songInteractionService.getFavouritesBySong(this.songId).subscribe(interactions => {
            this.songInteractionsSubject.next(interactions);
            if (this.userToken.id !== this.song.user.id) {
              const notification = {
                sender: {
                  id: this.userToken.id
                },
                recieverId: this.song.user.id,
                content: '',
                link: this.URL + this.song.id,
                action: 'liked your song: ' + this.song.name
              };
              this.socketService.createNotificationUsingSocket(notification);
            }
          })
        }, () => {
          this.notificationService.showErrorMessage('!Like error')
        });
      }
    }else {
      this.notificationService.showErrorMessage('You must login first')
    }
  }

  editSong() {

  }

  deleteSong() {

  }


  getSongDetail(id: number) {
    this.songService.findSongById(id).subscribe(song => {
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

  showAddTagForm() {
    console.log(this.song.user);
    console.log(this.userToken.id);
    if (this.song.user.id === this.userToken.id) {
      this.router.navigate(['/songs/addTag', this.song.id]);
    } else {
      this.notificationService.showErrorMessage('Only the owner is allowed to do this');
    }
  }

  getSongTags(id: number) {
    this.labelService.getSongTags(id).subscribe(labels => {
      this.songLabels = labels;
    });
  }
}
