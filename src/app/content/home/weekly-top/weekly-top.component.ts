import { Component, OnInit } from '@angular/core';
import {Song} from '../../../model/song';
import {SongService} from '../../../service/song/song.service';
import {QueueService} from '../../../service/queue/queue.service';
declare var $: any;

@Component({
  selector: 'app-weekly-top',
  templateUrl: './weekly-top.component.html',
  styleUrls: ['./weekly-top.component.css']
})
export class WeeklyTopComponent implements OnInit {

  songs: Song[] = [];

  constructor(private songService: SongService,
              private queueService: QueueService) {
    this.songService.getTopListenSong().subscribe(
      songs => this.songs = songs
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

  playSong(song: Song) {
    const request = {
      title: 'play',
      song: song
    }
    this.queueService.sendQueueRequest(request);
  }

  addToQueue(song: Song) {
    const request = {
      title: 'add',
      song: song
    };
    this.queueService.sendQueueRequest(request);
  }

  toogle(element: HTMLAnchorElement) {
    $('#add-song').show();
    const songId = element.getAttribute('data-song-id');
    this.songService.changeSongId(songId);
  }
}
