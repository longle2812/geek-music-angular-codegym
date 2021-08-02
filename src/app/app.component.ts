import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'geek-music';

  ngOnInit() {
    this.loadScript('/assets/js/plugins/player/volume.js');
    this.loadScript('/assets/js/plugins/player/audio-player.js');
    this.loadScript('/assets/js/plugins/player/jquery.jplayer.min.js');
    this.loadScript('/assets/js/plugins/player/jplayer.playlist.min.js');
    // this.loadScript('/assets/js/menu-slider.js');
    // this.loadScript('/assets/js/custom.js');
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
