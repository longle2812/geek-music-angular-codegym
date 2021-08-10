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

@Component({
  selector: 'app-singer-detail',
  templateUrl: './singer-detail.component.html',
  styleUrls: ['./singer-detail.component.css']
})
export class SingerDetailComponent implements OnInit {
  singer: Singer = {};
  userToken: UserToken = {};
  songs: Song[] = [];

  constructor(private activatedRouter: ActivatedRoute,
              private singerService: SingerService,
              private router: Router,
              private authenticationService: AuthenticationService,
              private songService: SongService
  ) {
    this.activatedRouter.paramMap.subscribe(paramMap => {
      const id = paramMap.get('id');
      this.getSinger(id);
      this.getSongs(id);
    });
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.userToken = user;
    });

  }

  private getSinger(id) {
    this.singerService.getById(id).subscribe(singer => {
      this.singer = singer;
      const date: Date = new Date(singer.dateOfBirth);
      singer.dateOfBirth = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;
      console.log(this.singer.id, this.singer.name, this.singer.dateOfBirth, this.singer.band, this.singer.additionalInfo);
    });
  }

  private getSongs(id) {
    this.songService.getSongBySingerId(id).subscribe(songs => {
      this.songs = songs;
      console.log('songs ', songs.length);
    });
  }

  ngOnInit() {
    this.loadScript('/assets/js/more-option.js');
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


}
