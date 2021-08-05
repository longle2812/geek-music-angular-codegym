import { Component, OnInit } from '@angular/core';
import {Song} from '../../../model/song';
import {SongService} from '../../../service/song/song.service';

@Component({
  selector: 'app-song-new',
  templateUrl: './new-song.component.html',
  styleUrls: ['./new-song.component.css']
})
export class NewSongComponent implements OnInit {
  songs: Song[] = [];
  offset: number = 0;
  limit:number = 10;
  constructor(private songService: SongService) { }

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

  viewMore() {
    this.limit+=10;
    this.getSongsSortByCreateTime();
  }
}
