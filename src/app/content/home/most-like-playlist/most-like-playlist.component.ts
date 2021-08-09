import { Component, OnInit } from '@angular/core';
import {PlaylistService} from '../../../service/playlist/playlist.service';
import {Playlist} from '../../../model/playlist';

@Component({
  selector: 'app-most-like-playlist',
  templateUrl: './most-like-playlist.component.html',
  styleUrls: ['./most-like-playlist.component.css']
})
export class MostLikePlaylistComponent implements OnInit {
  playlists : Playlist[] = [];

  constructor(private playlistService: PlaylistService) {
    this.playlistService.getAllPlaylistByMostLikes(5, 0).subscribe(
      playlists => this.playlists = playlists
    )
  }

  ngOnInit() {
    this.loadScript('/assets/js/menu-slider.js');
    this.loadScript('/assets/js/more-option.js');
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
