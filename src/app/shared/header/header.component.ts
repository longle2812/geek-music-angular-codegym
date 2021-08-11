import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserToken} from '../../model/user-token';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {Router} from '@angular/router';
import {UserService} from '../../service/user/user.service';
import {PlaylistService} from '../../service/playlist/playlist.service';
import {Playlist} from '../../model/playlist';
import {User} from '../../model/user';
import {Genre} from '../../model/genre';
import {GenreService} from '../../service/genres/genre.service';
import {SongService} from '../../service/song/song.service';
import {Song} from '../../model/song';
import {QueueService} from '../../service/queue/queue.service';
import {NotificationService} from '../../service/notification/notification.service';
import {SocketService} from '../../service/socket/socket.service';
import {SingerService} from '../../service/singer/singer.service';
import {Singer} from '../../model/singer';
import {LabelService} from '../../service/label/label.service';
import {Label} from '../../model/label';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentUser: UserToken = {};
  avatarUrl = '';
  users: User[];
  genres: Genre[];
  labels: Label[] = [];

  constructor(private userService: UserService, private authenticationService: AuthenticationService,
              private router: Router, private playlistService: PlaylistService, private genreService: GenreService,
              private songService: SongService, private queueService: QueueService, private notificationService: NotificationService,
              private socketService: SocketService, private singerService: SingerService,
              private labelService: LabelService) {
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.currentUser = user;
      this.loadScript('/assets/js/profile-on-click.js');
      this.getLabels();
    });
    this.authenticationService.currentUserAvatarSubject.subscribe(avatarUrl => {
      this.avatarUrl = avatarUrl;
    });
    this.socketService.connect();
  }

  ngOnInit() {
    this.getAvatarUrl();
    this.getAllUsers();
    this.getAllGenres();
    $(document).ready(() => {
      $('#labelSearch').select2();
    });
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }

  getAllUsers() {
    this.userService.findAll().subscribe(users => {
      this.users = users;
    }, e => {
      console.log(e);
    });
  }

  getAllGenres() {
    this.genreService.getAll().subscribe(genres => {
      this.genres = genres;
    }, e => {
      console.log(e);
    });
  }

  logout() {
    this.authenticationService.logout();
    this.notificationService.showLogoutMessage('Goodbye. You have logged out!');
    this.router.navigateByUrl('');
    this.queueService.resetQueue();
    this.playlistService.currentSearchPlaylistSubject.next(null);
    $('#jp_playing_artist').text('');
    $('#jp_playing_img').attr('src', 'assets/images/album/album.jpg');
    $('#jp_playing_title').text('');
    this.socketService.disconnect();
  }

  getAvatarUrl() {
    this.userService.findById(this.currentUser.id).subscribe(user => {
      this.avatarUrl = user.avatarUrl;
    }, e => {
      console.log(e);
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

  hideSelectOption(e) {
    const selectDropdown = document.getElementById('selectBtn');
    const searchBar = document.getElementById('searchBar');
    const arrowDropdown = document.getElementById('arrow_drop_down');
    const advancedSearch = document.getElementById('advance-search');
    const target = $(e.target);
    if (target.is('.dropDownChild')) {
      if (advancedSearch.style.display === 'block') {
        advancedSearch.style.display = 'none';
      } else {
        advancedSearch.style.display = 'block';
      }
    }
    if (target.is('#searchPlaylistInput') || target.is('#selectBtn')
      || target.is('.selectChild') || target.is('.searchIcon') ||
      target.is('#arrow_drop_down') || target.is('.selectMenu')) {
      selectDropdown.style.display = 'block';
      searchBar.style.width = '30%';
      arrowDropdown.style.display = 'block';
    } else {
      selectDropdown.style.display = 'none';
      searchBar.style.width = '25%';
      arrowDropdown.style.display = 'none';
      advancedSearch.style.display = 'none';
    }
  }

  search() {
    const searchOption = $('#selectBtn :selected').text();
    const genreName = $('#genreName').val();
    const keyWord = $('#searchPlaylistInput').val();
    const startDate = $('#startDate').val();
    const endDate = $('#endDate').val();
    const userName = $('#userSelected').val();
    const advancedSearch = document.getElementById('advance-search');
    if (searchOption === 'Playlist') {
      this.searchPlayList(genreName, keyWord, startDate, endDate, userName, advancedSearch);
    }
    if (searchOption === 'Song') {
      this.searchSong(genreName, keyWord, startDate, endDate, userName, advancedSearch);
    }
    if (searchOption === 'Singer') {
      this.searchSinger(keyWord, userName, genreName, startDate, endDate, advancedSearch);
    }
    if (searchOption === 'Song\'s label') {
      this.searchLabel(keyWord);
    }
  }

  searchPlayList(genreName, keyWord, startDate, endDate, userName, advancedSearch) {
    if (advancedSearch.style.display === 'block') {
      this.playlistService.searchAdvanced(genreName, keyWord, startDate, endDate, userName).subscribe((playlists: Playlist[]) => {
        this.playlistService.currentSearchPlaylistSubject.next(playlists);
      });
    } else {
      this.playlistService.searchByName(keyWord).subscribe((playlists: Playlist[]) => {
        this.playlistService.currentSearchPlaylistSubject.next(playlists);
      });
    }
    this.router.navigateByUrl('/playlists/search');
  }

  private searchSong(genreName, keyWord, startDate, endDate, userName, advancedSearch) {
    if (advancedSearch.style.display === 'block') {
      this.songService.searchSongAdvance(keyWord, userName, genreName, startDate, endDate).subscribe((songs: Song[]) => {
        this.songService.currentSearchSongSubject.next(songs);
      });
    } else {
      this.songService.searchSongByName(keyWord).subscribe((songs: Song[]) => {
        this.songService.currentSearchSongSubject.next(songs);
      });
    }
    this.router.navigateByUrl('/songs/search');
  }

  private searchSinger(keyWord, userName, genreName, startDate, endDate, advancedSearch) {
    if (advancedSearch.style.display === 'block') {
      this.singerService.searchAdvanced(keyWord, userName, genreName, startDate, endDate).subscribe((singers: Singer[]) => {
        this.singerService.currentSearchSingerSubject.next(singers);
      });
    } else {
      this.singerService.searchByName(keyWord).subscribe((singers: Singer[]) => {
        this.singerService.currentSearchSingerSubject.next(singers);
      });
    }
    this.router.navigateByUrl('/singers/search');
  }

  hideDropDown() {
    $('.pro_dropdown_menu').toggleClass('open_dropdown');
  }

  private searchLabel(keyWord) {
    this.labelService.findSongByTagName(keyWord).subscribe((songs: Song[]) => {
      this.songService.currentSearchSongSubject.next(songs);
      this.router.navigateByUrl('/songs/search');
    });
  }
  getLabels() {
    this.labelService.getAllLabel().subscribe(labels => {
      this.labels = labels;
    });
  }
}
