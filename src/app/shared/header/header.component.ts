import {Component, OnInit} from '@angular/core';
import {UserToken} from '../../model/user-token';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {Router} from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isActive = false;
  currentUser: UserToken = {};

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.isActive = false;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigateByUrl('');
  }

  changeActive() {
    this.isActive = !this.isActive;
  }
}
