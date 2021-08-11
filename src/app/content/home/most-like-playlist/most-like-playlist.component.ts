import { Component, OnInit } from '@angular/core';
import {PlaylistService} from '../../../service/playlist/playlist.service';
import {Playlist} from '../../../model/playlist';
import {QueueService} from '../../../service/queue/queue.service';
import {SongService} from '../../../service/song/song.service';
declare var $: any;

@Component({
  selector: 'app-most-like-playlist',
  templateUrl: './most-like-playlist.component.html',
  styleUrls: ['./most-like-playlist.component.css']
})
export class MostLikePlaylistComponent implements OnInit {
  playlists : Playlist[] = [];

  constructor(private playlistService: PlaylistService, private queueService: QueueService,
              private songService: SongService) {
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

  playPlaylist(playlist: any) {
    const request = {
      title: 'play playlist',
      playlist: playlist,
      playlistId: playlist.id,
      songs: undefined
    };
    this.queueService.sendQueueRequest(request);
  }

  addToQueue(playlist: any) {
    const request = {
      title: 'play playlist',
      playlist: playlist,
      playlistId: playlist.id,
      songs: undefined
    };
    this.queueService.sendQueueRequest(request);
  }

  toogle(element: HTMLAnchorElement) {
    $('#add-song').show();
    const songId = element.getAttribute('data-song-id');
    this.songService.changeSongId(songId);
  }

  share(element: HTMLAnchorElement) {
    $('#share-playlist').show();
    const id = element.getAttribute('data-song-id');
    console.log(id);
    this.playlistService.changePlaylistId(id);
  }
}
