import { Component, OnInit } from '@angular/core';
import {Playlist} from '../../../model/playlist';
import {PlaylistService} from '../../../service/playlist/playlist.service';
import {Router} from '@angular/router';
import {QueueService} from '../../../service/queue/queue.service';

@Component({
  selector: 'app-featured-album',
  templateUrl: './featured-album.component.html',
  styleUrls: ['./featured-album.component.css']
})
export class FeaturedAlbumComponent implements OnInit {
  playlists: Playlist[] = [];

  constructor(private playlistService: PlaylistService, private router: Router, private queueService: QueueService) {
  }

  ngOnInit() {
    this.playlistService.getAllPlaylistByListenCount(5,0).subscribe(
      playlists => this.playlists = playlists
    )
  }

  changeLink(id: number) {
    this.router.navigateByUrl(`/playlist/${id}`);
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

  playPlaylist(playlist: any) {
    const request = {
      title: 'play playlist',
      playlist: playlist,
      playlistId: playlist.id,
      songs: undefined
    };
    this.queueService.sendQueueRequest(request);
  }
}
