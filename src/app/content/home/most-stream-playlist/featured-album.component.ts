import { Component, OnInit } from '@angular/core';
import {Playlist} from '../../../model/playlist';
import {PlaylistService} from '../../../service/playlist/playlist.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-featured-album',
  templateUrl: './featured-album.component.html',
  styleUrls: ['./featured-album.component.css']
})
export class FeaturedAlbumComponent implements OnInit {
  playlists: Playlist[] = [];

  constructor(private playlistService: PlaylistService, private router: Router) {
  }

  ngOnInit() {
    this.playlistService.getAllPlaylistByListenCount(5,0).subscribe(
      playlists => this.playlists = playlists
    )
  }

}
