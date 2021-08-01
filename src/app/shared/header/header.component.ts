import {Component, OnInit} from '@angular/core';
import {UserToken} from '../../model/user-token';
import {AuthenticationService} from '../../service/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: UserToken = {};

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout();
  }
}
