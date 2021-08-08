import { Component, OnInit } from '@angular/core';
import {Playlist} from '../../../model/playlist';
import {PlaylistService} from '../../../service/playlist/playlist.service';

@Component({
  selector: 'app-featured-album',
  templateUrl: './featured-album.component.html',
  styleUrls: ['./featured-album.component.css']
})
export class FeaturedAlbumComponent implements OnInit {
  playlists: Playlist[] = [];

  constructor(private playlistService: PlaylistService) {
    this.playlistService.getAllPlaylistByListenCount(5,0).subscribe(
      playlists => this.playlists = playlists
    )
  }

  ngOnInit() {
  }

}
