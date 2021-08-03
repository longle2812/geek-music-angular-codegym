import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PlaylistService} from '../../../service/playlist/playlist.service';
import {Playlist} from '../../../model/playlist';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.css']
})
export class PlaylistDetailComponent implements OnInit {
  playlist: Playlist = {};

  constructor(private activatedRouter: ActivatedRoute,
              private playlistService: PlaylistService) {
    this.activatedRouter.paramMap.subscribe(paramMap => {
      const id = paramMap.get('id');
      this.getPlaylist(id);
    });

  }

  ngOnInit() {

  }

  private getPlaylist(id) {
    this.playlistService.getPlaylist(id).subscribe(playlist => {
      this.playlist = playlist;
    });
  }
}
