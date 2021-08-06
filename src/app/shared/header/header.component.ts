import {Component, OnInit} from '@angular/core';
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
import {NotificationService} from '../../service/notification/notification.service';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: UserToken = {};
  avatarUrl = '';
  users: User[];
  genres: Genre[];

  constructor(private userService: UserService, private authenticationService: AuthenticationService,
              private router: Router, private playlistService: PlaylistService, private genreService: GenreService,
              private songService: SongService, private notificationService: NotificationService) {
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.currentUser = user;
      this.loadScript('/assets/js/profile-on-click.js');
    });
    this.authenticationService.currentUserAvatarSubject.subscribe(avatarUrl => {
      this.avatarUrl = avatarUrl;
    });
  }

  ngOnInit() {
    this.getAvatarUrl();
    this.getAllUsers();
    this.getAllGenres();
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

  hideDropDown() {
    $('.pro_dropdown_menu').toggleClass('open_dropdown');
  }
}
