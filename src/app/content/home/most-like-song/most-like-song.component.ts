import {Component, OnInit} from '@angular/core';
import {Song} from '../../../model/song';
import {SongService} from '../../../service/song/song.service';
import {QueueService} from '../../../service/queue/queue.service';
declare var $: any;

@Component({
  selector: 'app-most-like-song',
  templateUrl: './most-like-song.component.html',
  styleUrls: ['./most-like-song.component.css']
})
export class MostLikeSongComponent implements OnInit {
  songs: Song[] = [];

  constructor(private songService: SongService, private queueService: QueueService) {
    this.songService.getSongByLikes(6, 0).subscribe(
      songs => this.songs = songs
  )
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

}
