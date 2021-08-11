import {Component, OnInit} from '@angular/core';
import {PlaylistService} from '../../../service/playlist/playlist.service';
import {Playlist} from '../../../model/playlist';
import {QueueService} from '../../../service/queue/queue.service';
declare var $:any;
@Component({
  selector: 'app-most-recent-playlist',
  templateUrl: './most-recent-playlist.component.html',
  styleUrls: ['./most-recent-playlist.component.css']
})
export class MostRecentPlaylistComponent implements OnInit {
  playlists: Playlist[] = [];

  constructor(private playlistService: PlaylistService, private queueService: QueueService) {
    this.playlistService.getAllPlaylistByMostRecent(5, 0).subscribe(
      playlists => {
        this.playlists = playlists;
      }
    );
  }

  ngOnInit() {
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

  share(element: HTMLAnchorElement) {
    $('#share-playlist').show();
    const id = element.getAttribute('data-song-id');
    console.log(id);
    this.playlistService.changePlaylistId(id);
  }
}
