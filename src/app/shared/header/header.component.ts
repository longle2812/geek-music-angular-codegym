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

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isActive = false;
  currentUser: UserToken = {};
  avatarUrl = '';
  users: User[];
  genres: Genre[];

  constructor(private userService: UserService, private authenticationService: AuthenticationService,
              private router: Router, private playlistService: PlaylistService, private genreService: GenreService) {
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.currentUser = user;
    });
    this.authenticationService.currentUserAvatarSubject.subscribe(avatarUrl => {
      this.avatarUrl = avatarUrl;
    });
  }

  ngOnInit() {
    this.isActive = false;
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
    this.router.navigateByUrl('');
  }

  changeActive() {
    this.isActive = !this.isActive;
  }

  getAvatarUrl() {
    this.userService.findById(this.currentUser.id).subscribe(user => {
      this.avatarUrl = user.avatarUrl;
    }, e => {
      console.log(e);
    });
  }


  hideSelectOption(e) {
    const selectDropdown = document.getElementById('selectBtn');
    const searchBar = document.getElementById('searchBar');
    const arrowDropdown = document.getElementById('arrow_drop_down');
    const advancedSearch = document.getElementById('advance-search');
    const target = $(e.target);
    if (target.is('.dropDownChild')) {
      advancedSearch.style.display = 'block';
    }
    if (target.is('#searchPlaylistInput') || target.is('#selectBtn')
      || target.is('.selectChild') || target.is('.searchIcon') || target.is('#arrow_drop_down') || target.is('.selectMenu')) {
      selectDropdown.style.display = 'block';
      searchBar.style.width = '25%';
      arrowDropdown.style.display = 'block';
    } else {
      selectDropdown.style.display = 'none';
      searchBar.style.width = '20%';
      arrowDropdown.style.display = 'none';
      advancedSearch.style.display = 'none';
    }
  }

  search() {
    const searchOption = $('#selectBtn :selected').text();
    if (searchOption === 'Playlist') {
      this.searchPlayList();
    }
  }

  searchPlayList() {
    const genre = $('#genreSelected :selected').val();
    const playlistName = $('#searchPlaylistInput').val();
    const startDate = $('#startDate').val();
    const endDate = $('#endDate').val();
    const userId = +$('#userSelected :selected').val();
    const advancedSearch = document.getElementById('advance-search');
    if (advancedSearch.style.display === 'block') {
      this.playlistService.searchAdvanced(genre, playlistName, startDate, endDate, userId).subscribe((playlists: Playlist[]) => {
        // console.log(playlists);
        this.playlistService.currentSearchPlaylistSubject.next(playlists);
      });
    } else {
      this.playlistService.searchByName(playlistName).subscribe((playlists: Playlist[]) => {
        console.log(playlists);
        this.playlistService.currentSearchPlaylistSubject.next(playlists);
      });
    }
    this.router.navigateByUrl('/playlists/search');
  }
}
