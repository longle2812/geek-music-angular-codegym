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

  constructor(private activatedRouter: ActivatedRoute,
              private songService: SongService,
              private router: Router,
              private authenticationService: AuthenticationService,
              private notificationService: NotificationService, private socketService: SocketService,
              private userService: UserService) {
    this.activatedRouter.paramMap.subscribe(paramMap => {
      const id = +paramMap.get('id');
      this.getSongDetail(id);
    });
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.userToken = user;
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

  }

  editSong() {

  }

  deleteSong() {

  }

  addComment() {

  }

  getSongDetail(id: number) {
    this.songService.findSongById(id).subscribe(song => {
      console.log(song);
      this.song = song;
    });
  }
}
