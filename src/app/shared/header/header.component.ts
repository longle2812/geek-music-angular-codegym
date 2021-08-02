import {Component, OnInit} from '@angular/core';
import {UserToken} from '../../model/user-token';
import {AuthenticationService} from '../../service/authentication/authentication.service';

declare var $: any;

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
    this.loadScript('/assets/js/drop-down.js');
  }

  logout() {
    this.authenticationService.logout();
  }

  toggleDropdown() {
    console.log('clicked!');
    $('.pro_dropdown_menu').toggleClass('open_dropdown');
    // $('.pro_dropdown_menu').addClass('open_dropdown');
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
