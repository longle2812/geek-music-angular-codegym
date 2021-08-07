import { Component, OnInit } from '@angular/core';
import {Playlist} from '../../../model/playlist';
import {UserToken} from '../../../model/user-token';
import {PlaylistService} from '../../../service/playlist/playlist.service';
import {GenreService} from '../../../service/genres/genre.service';
import {AuthenticationService} from '../../../service/authentication/authentication.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../../service/notification/notification.service';
import {Singer} from '../../../model/singer';
import {SingerService} from '../../../service/singer/singer.service';

@Component({
  selector: 'app-singer-list',
  templateUrl: './singer-list.component.html',
  styleUrls: ['./singer-list.component.css']
})
export class SingerListComponent implements OnInit {
  singers: Singer[] = [];
  userToken: UserToken = {};
  constructor(private singerService: SingerService,
              private genreService: GenreService,
              private authenticationService: AuthenticationService,
              private router: Router,
              private notificationService: NotificationService) {
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.userToken = user;
    });
  }

  ngOnInit() {
    this.getAllPlaylist();

  }

  private getAllPlaylist() {
  this.singerService.getAll().subscribe(singers => {
    this.singers= singers;
  })

  }

  message() {
    this.notificationService.showErrorMessage('You must be logged in to create a new singer');
  }

  createPage() {
    this.router.navigateByUrl("singer/create");
  }
}
