import { Component, OnInit } from '@angular/core';
import {Song} from '../../../model/song';
import {SongService} from '../../../service/song/song.service';

@Component({
  selector: 'app-song-new',
  templateUrl: './song-new.component.html',
  styleUrls: ['./song-new.component.css']
})
export class SongNewComponent implements OnInit {
  songs: Song[] = [];
  constructor(private songService: SongService) { }

  ngOnInit() {
    this.getSongsSortByCreateTime();
  }

  private getSongsSortByCreateTime() {
    this.songService.getSongsSortByCreateAt().subscribe(songs =>{
      this.songs=songs;
    })
  }
}
