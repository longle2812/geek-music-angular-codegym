import {Component, OnInit} from '@angular/core';
import {Song} from '../../model/song';
import {SongService} from '../../service/song/song.service';
import {UserToken} from '../../model/user-token';
import {AuthenticationService} from '../../service/authentication/authentication.service';

declare var $: any;

@Component({
  selector: 'app-uploaded-list',
  templateUrl: './uploaded-list.component.html',
  styleUrls: ['./uploaded-list.component.css']
})
export class UploadedListComponent implements OnInit {
  songs: Song[] = [];
  currentUser: UserToken = {};
  genres: '';
  searchValue = '';

  constructor(private songService: SongService,
              private authenticationService: AuthenticationService) {
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.currentUser = user;
    });
    this.getAllSong();
  }

  ngOnInit() {
    this.loadScript('/assets/js/menu-slider.js');
    this.loadScript('/assets/js/plugins/player/jplayer.playlist.min.js');
  }

  getAllSong() {
    this.songService.getAllSongByUserId(this.currentUser.id).subscribe(
      songs => {
        this.songs = songs;
      }
    );
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

  search(searchValue: string) {
    if (searchValue === '') {
      this.getAllSong();
    } else {
      this.songService.getSongByNameOrAuthor(searchValue, this.currentUser.id).subscribe(
        songs => this.songs = songs,
        () => alert('Not found')
      );
    }
  }

  playMusic(song: Song) {
    console.log(song);
    $('#jquery_jplayer_1').jPlayer('setMedia', {
      image : song.imgUrl,
      title: song.name,
      artist: song.author,
      mp3: song.fileMp3,
    });

    $('#jquery_jplayer_1').jPlayer('play');
    setTimeout(() => {
      $('#jp_playing_artist').text(song.author);
      $('#jp_playing_img').attr('src', song.imgUrl);
      $('#jp_playing_title').text(song.name);
    }, 100);
  }
}
