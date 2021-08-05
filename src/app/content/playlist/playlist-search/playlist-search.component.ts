import { Component, OnInit } from '@angular/core';
import {PlaylistService} from '../../../service/playlist/playlist.service';
import {Playlist} from '../../../model/playlist';

@Component({
  selector: 'app-playlist-search',
  templateUrl: './playlist-search.component.html',
  styleUrls: ['./playlist-search.component.css']
})
export class PlaylistSearchComponent implements OnInit {
  playlists: Playlist[];
  constructor(private playlistService: PlaylistService) {
    this.playlistService.currentSearchPlaylistSubject.subscribe(playlists => {
      this.playlists = playlists;
    });
  }

  ngOnInit() {
  }

}
