import {Component, OnInit} from '@angular/core';
import {Song} from '../../model/song';
import {SongService} from '../../service/song/song.service';
import {QueueService} from '../../service/queue/queue.service';
declare var $: any;
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
