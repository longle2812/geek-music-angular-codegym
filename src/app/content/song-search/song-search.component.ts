import {Component, OnInit} from '@angular/core';
import {Song} from '../../model/song';
import {SongService} from '../../service/song/song.service';
import {QueueService} from '../../service/queue/queue.service';

@Component({
  selector: 'app-song-search',
  templateUrl: './song-search.component.html',
  styleUrls: ['./song-search.component.css']
})
export class SongSearchComponent implements OnInit {
  songs: Song[];

  constructor(private songService: SongService, private queueService: QueueService) {
    this.songService.currentSearchSongSubject.subscribe(songs => {
      this.songs = songs;
    });
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

  playSong(song: Song) {
    const request = {
      title: 'play',
      song: song
    };
    this.queueService.sendQueueRequest(request);
  }
}
