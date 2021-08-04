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
  isActive = false;
  currentUser: UserToken = {};
  avatarUrl = '';

  constructor(private userService: UserService, private authenticationService: AuthenticationService, private router: Router) {
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.currentUser = user;
    });
    this.authenticationService.currentUserAvatarSubject.subscribe(avatarUrl => {
      this.avatarUrl = avatarUrl;
    });
  }

  ngOnInit() {
    this.isActive = true;
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
    if (target.is('#btn') || target.is('#selectBtn') || target.is('.selectChild')) {
      selectDropdown.style.display = 'block';
    } else {
      $('#selectBtn').hide();
      selectDropdown.style.display = 'none';
    }
  }
}
