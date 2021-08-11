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
import {SongInteractionDTO} from '../../../model/song-interaction-d-t-o';
import {SongInteraction} from '../../../model/songInteraction';
import {SongInteractionService} from '../../../service/song-interaction/song-interaction.service';

@Component({
  selector: 'app-detail-song',
  templateUrl: './detail-song.component.html',
  styleUrls: ['./detail-song.component.css']
})
export class DetailSongComponent implements OnInit {
  song: Song = {};
  userToken: UserToken = {};
  commentForm: FormGroup = new FormGroup({
    comment: new FormControl('', [Validators.required])
  });
  comments: any;
  // page = 0;
  // size = 5;

  interactionId: number = -1;
  songId: number = -1;
  interactionDTO: SongInteractionDTO = {};

  public songInteractionsSubject: BehaviorSubject<SongInteraction[]>;
  public currentSongInteraction: Observable<SongInteraction[]>;

  constructor(private activatedRouter: ActivatedRoute,
              private songService: SongService,
              private router: Router,
              private authenticationService: AuthenticationService,
              private notificationService: NotificationService,
              private socketService: SocketService,
              private songInteractionService: SongInteractionService,
              private userService: UserService) {
    this.activatedRouter.paramMap.subscribe(paramMap => {
      const id = Number(paramMap.get('id'));
      this.songId = id;
      this.getSongDetail(id);
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
          })
        }, () => {
          alert(' like  error');
        });
      } else {
        this.interactionDTO.likes = !this.interactionDTO.likes;
        this.songInteractionService.update(this.interactionId, this.interactionDTO).subscribe(() => {
          this.songInteractionService.getFavouritesBySong(this.songId).subscribe(interactions => {
            this.songInteractionsSubject.next(interactions);
          })
        }, () => {
          alert(' unlike  error');
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

  addComment() {

  }

  getSongDetail(id: number) {
    this.songService.findSongById(id).subscribe(song => {
      this.song = song;
    })
  }
}
