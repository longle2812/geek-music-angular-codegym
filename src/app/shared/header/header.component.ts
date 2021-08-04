import {Component, OnInit} from '@angular/core';
import {UserToken} from '../../model/user-token';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {Router} from '@angular/router';
import {UserService} from '../../service/user/user.service';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: UserToken = {};
  avatarUrl = '';

  constructor(private userService: UserService, private authenticationService: AuthenticationService, private router: Router) {
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
  }

  logout() {
    this.authenticationService.logout();
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
}
