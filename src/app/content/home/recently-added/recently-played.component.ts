import {Component, OnInit} from '@angular/core';
import {SongService} from '../../../service/song/song.service';
import {Song} from '../../../model/song';
import {QueueService} from '../../../service/queue/queue.service';
import {element} from 'protractor';

declare var $: any;

@Component({
  selector: 'app-recently-played',
  templateUrl: './recently-played.component.html',
  styleUrls: ['./recently-played.component.css']
})
export class RecentlyPlayedComponent implements OnInit {
  songs: Song[] = [];

  constructor(private songService: SongService,
              private queueService: QueueService) {
    this.songService.getSongsSortByCreateTime(0, 6).subscribe(
      songs => this.songs = songs
    );
  }

  ngOnInit() {
  }

  playSong(song: any) {
    const request = {
      title: 'play',
      song: song,
      songId: song.id
    };
    this.queueService.sendQueueRequest(request);
  }

  addToQueue(song: any) {
    const request = {
      title: 'add',
      song: song,
      songId: song.id
    };
    this.queueService.sendQueueRequest(request);
  }

  toogle(element: HTMLAnchorElement) {
    $('#add-song').show();
    const songId = element.getAttribute('data-song-id');
    this.songService.changeSongId(songId);
  }

  share(element: HTMLAnchorElement) {
    $('#share-song').show();
    const songId = element.getAttribute('data-song-id');
    this.songService.changeSongId(songId);
  }
}
