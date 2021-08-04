import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm} from '@angular/forms';
import {AuthenticationService} from './service/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'geek-music';

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.loadScript('/assets/js/plugins/player/volume.js');
    // this.loadScript('/assets/js/plugins/player/audio-player.js');
    // this.loadScript('/assets/js/plugins/player/jquery.jplayer.min.js');
    // this.loadScript('/assets/js/plugins/player/jplayer.playlist.min.js');
    // this.loadScript('/assets/js/menu-slider.js');
    this.loadScript('/assets/js/custom.js');
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


  login(loginForm: NgForm) {
    this.authenticationService.login(loginForm.value.username, loginForm.value.password).subscribe(
      () => console.log('success')
    );
  }
}
