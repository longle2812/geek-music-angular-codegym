import {Component, OnInit} from '@angular/core';
import {UserToken} from '../../model/user-token';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {Router} from '@angular/router';
import {UserService} from '../../service/user/user.service';
import {PlaylistService} from '../../service/playlist/playlist.service';
import {Playlist} from '../../model/playlist';

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

  constructor(private userService: UserService, private authenticationService: AuthenticationService,
              private router: Router, private playlistService: PlaylistService) {
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
    const target = $(e.target);
    if (target.is('#searchPlaylistInput') || target.is('#selectBtn')
      || target.is('.selectChild') || target.is('.searchIcon')) {
      selectDropdown.style.display = 'block';
    } else {
      selectDropdown.style.display = 'none';
    }
  }

  search() {
    let searchOption = $('#selectBtn :selected').text();
    console.log(searchOption);
    if (searchOption === 'Playlist') {
      this.searchPlayList();
    }
  }

  searchPlayList() {
    const name = $('#searchPlaylistInput').val();
    console.log(name);
    this.playlistService.searchByName(name).subscribe((playlists: Playlist[]) => {
      console.log(playlists);
      this.playlistService.currentSearchPlaylistSubject.next(playlists);
      this.router.navigateByUrl('/playlists/search');
    });
  }
}
