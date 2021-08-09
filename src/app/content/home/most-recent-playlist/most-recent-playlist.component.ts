import {Component, OnInit} from '@angular/core';
import {PlaylistService} from '../../../service/playlist/playlist.service';
import {Playlist} from '../../../model/playlist';

@Component({
  selector: 'app-most-recent-playlist',
  templateUrl: './most-recent-playlist.component.html',
  styleUrls: ['./most-recent-playlist.component.css']
})
export class MostRecentPlaylistComponent implements OnInit {
  playlists: Playlist[] = [];

  constructor(private playlistService: PlaylistService) {
    this.playlistService.getAllPlaylistByMostRecent(5, 0).subscribe(
      playlists => {
        this.playlists = playlists;
      }
    );
  }

  ngOnInit() {
  }

}
