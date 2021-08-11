import {Component, OnInit} from '@angular/core';
import {Playlist} from '../../../model/playlist';
import {UserToken} from '../../../model/user-token';
import {ActivatedRoute, Router} from '@angular/router';
import {PlaylistService} from '../../../service/playlist/playlist.service';
import {AuthenticationService} from '../../../service/authentication/authentication.service';
import {Singer} from '../../../model/singer';
import {SingerService} from '../../../service/singer/singer.service';
import {Song} from '../../../model/song';
import {SongService} from '../../../service/song/song.service';
import {PlaylistInteractionDTO} from '../../../model/playlist-interaction-dto';
import {BehaviorSubject, Observable} from 'rxjs';
import {PlaylistInteraction} from '../../../model/playlist-interaction';
import {SingerInteraction} from '../../../model/singer-interaction';
import {SingerInteractionService} from '../../../service/singer-interaction/singer-interaction.service';
import {SingerInteractionDTO} from '../../../model/singer-interaction-dto';
import {NotificationService} from '../../../service/notification/notification.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SongInteraction} from '../../../model/song-interaction';
import {SocketService} from '../../../service/socket/socket.service';
import {UserService} from '../../../service/user/user.service';
import {User} from '../../../model/user';

declare var $: any;
@Component({
  selector: 'app-singer-detail',
  templateUrl: './singer-detail.component.html',
  styleUrls: ['./singer-detail.component.css']
})
export class SingerDetailComponent implements OnInit {
  URL = '/songs/detail/';
  singer: Singer = {};
  userToken: UserToken = {};
  songs: Song[] = [];
  commentForm: FormGroup = new FormGroup({
    comment: new FormControl('', [Validators.required])
  });
  comments: SongInteraction[];
  page = 0;
  size = 5;
  scrollPercent = 0.796;
  interactionId: number = -1;
  singerId: number = -1;
  interactionDTO: SingerInteractionDTO = {};

  public singerInteractionsSubject: BehaviorSubject<SingerInteraction[]>;
  public currentSingerInteraction: Observable<SingerInteraction[]>;

  constructor(private activatedRouter: ActivatedRoute,
              private singerService: SingerService,
              private router: Router,
              private authenticationService: AuthenticationService,
              private songService: SongService,
              private notificationService: NotificationService,
              private socketService: SocketService,
              private userService: UserService,private singerInteractionService: SingerInteractionService) {
    this.activatedRouter.paramMap.subscribe(paramMap => {
      this.singerId = Number(paramMap.get('id'));
      this.getSinger(this.singerId);
      this.getSongs(this.singerId);
      this.getSingerComment(this.singerId);
    });
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.userToken = user;
    });
    if (this.userToken != null && this.singer != null) {
      this.singerInteractionService.getFavouriteByUserAndSingerId(this.userToken.id, this.singerId).subscribe(interaction => {
        console.log('get uer an singer')
        if (interaction != null) {
          this.interactionId = interaction.id;
          this.interactionDTO = interaction;
          console.log('>>>>> 1'+this.interactionDTO.recieverId +'   '+ this.interactionDTO.singerId +'   '+ this.interactionDTO.singerId)
        } else {
          if (this.userToken != null) {
            this.interactionDTO.senderId = this.userToken.id;
            this.interactionDTO.singerId = this.singer.id;
            this.interactionDTO.recieverId = this.singer.user.id;
            this.interactionDTO.comment = null;
            this.interactionDTO.link = null;
            this.interactionDTO.likes = false;
            this.interactionDTO.isRead = false;
            console.log('>>>>> 2'+this.interactionDTO.recieverId +'   '+ this.interactionDTO.singerId +'   '+ this.interactionDTO.singerId)
          }
        }
      });
    }

    this.singerInteractionService.getFavouritesBySingerId(this.singerId).subscribe(interactions => {
      this.singerInteractionsSubject = new BehaviorSubject<PlaylistInteraction[]>(interactions);
      this.currentSingerInteraction = this.singerInteractionsSubject.asObservable();
    });

  }

  private getSinger(id) {
    this.singerService.getById(id).subscribe(singer => {
      this.singer = singer;
      const date: Date = new Date(singer.dateOfBirth);
      singer.dateOfBirth = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
      console.log(this.singer.id, this.singer.name, this.singer.dateOfBirth, this.singer.band, this.singer.additionalInfo);
    });
  }

  private getSongs(id) {
    this.songService.getSongBySingerId(id).subscribe(songs => {
      this.songs = songs;
      // console.log('songs ', songs.length);
    });
  }

  ngOnInit() {
    this.loadScript('/assets/js/menu-slider.js');
    this.loadScript('/assets/js/more-option.js');
    this.size = 5;
    this.checkScrollDownBottom();
    this.scrollPercent = 0.796;
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

  addComment() {
    this.commentForm.markAllAsTouched();
    if (this.userToken === null) {
      this.notificationService.showErrorMessage('Need to login first before comment');
    }
    if (this.commentForm.valid && this.userToken !== null) {
      this.singerService.addSingerComment(this.userToken.id, this.singer.id,
        this.commentForm.value.comment).subscribe(songInteraction => {
        if (this.userToken.id !== this.singer.user.id) {
          const notification = {
            sender: {
              id: this.userToken.id
            },
            recieverId: this.singer.user.id,
            link: this.URL + this.singer.id,
            content: this.commentForm.value.comment,
            action: 'commented on your song: ' + this.singer.name
          };
          this.socketService.createNotificationUsingSocket(notification);
        }

        this.commentForm.reset();

        this.getSingerComment(this.singer.id);
      }, e => {
        console.log(e);
      });
    }
  }

  getSingerComment(id: number) {
    this.singerService.getSingerComment(id, this.page, this.size).subscribe((comments: SingerInteraction[]) => {
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
        this.getSingerComment(this.singer.id);
        this.scrollPercent += 0.017;
      }
    });
  }

  addFavourite() {
    if(this.userToken != null){
      if (this.interactionId == -1) {
        this.interactionDTO.likes = true;
        this.singerInteractionService.create(this.interactionDTO).subscribe(interaction => {
          this.interactionDTO = interaction;
          this.interactionId = interaction.id;
          this.singerInteractionService.getFavouritesBySingerId(this.singerId).subscribe(interactions => {
            this.singerInteractionsSubject.next(interactions);
          })
        }, () => {
          alert(' like  error');
        });
      } else {
        this.interactionDTO.likes = !this.interactionDTO.likes;
        this.singerInteractionService.update(this.interactionId, this.interactionDTO).subscribe(() => {
          this.singerInteractionService.getFavouritesBySingerId(this.singerId).subscribe(interactions => {
            this.singerInteractionsSubject.next(interactions);
          })
        }, () => {
          alert(' unlike  error');
        });
      }
    }else {
      this.notificationService.showErrorMessage('You must login first')
    }
  }
}
