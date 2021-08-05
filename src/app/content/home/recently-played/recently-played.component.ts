import { Component, OnInit } from '@angular/core';
import {SongService} from '../../../service/song/song.service';
import {Song} from '../../../model/song';
import {QueueService} from '../../../service/queue/queue.service';

@Component({
  selector: 'app-recently-played',
  templateUrl: './recently-played.component.html',
  styleUrls: ['./recently-played.component.css']
})
export class RecentlyPlayedComponent implements OnInit {
  songs: Song[] = [];
  constructor(private songService: SongService,
              private queueService: QueueService) {
    this.songService.getSongsSortByCreateTime(0,6).subscribe(
      songs => this.songs = songs
    )
  }

  ngOnInit() {
  }

  playSong(song: Song) {
    const request = {
      title: 'play',
      song: song
    }
    this.queueService.sendQueueRequest(request);
  }
}
