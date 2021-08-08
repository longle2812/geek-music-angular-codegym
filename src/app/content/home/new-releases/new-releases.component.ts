import { Component, OnInit } from '@angular/core';
import {Song} from '../../../model/song';
import {SongService} from '../../../service/song/song.service';
import {QueueService} from '../../../service/queue/queue.service';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})
export class NewReleasesComponent implements OnInit {

  songs: Song[] = [];
  offset: number = 0;
  limit:number = 5;
  constructor(private songService: SongService, private queueService: QueueService) { }

  ngOnInit() {
    this.getSongsSortByCreateTime();
    this.loadScript('/assets/js/menu-slider.js');

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
  private getSongsSortByCreateTime() {
    this.songService.getSongsSortByCreateTime(this.offset, this.limit).subscribe(songs =>{
      this.songs=songs;
    })
  }

  playSong(song: any) {
    const request = {
      title: 'play',
      song: song,
      songId: song.id
    }
    this.queueService.sendQueueRequest(request);
  }
}
