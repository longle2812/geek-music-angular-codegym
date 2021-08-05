import {Component, OnInit} from '@angular/core';
import {Song} from '../../model/song';
import {SongService} from '../../service/song/song.service';

@Component({
  selector: 'app-song-search',
  templateUrl: './song-search.component.html',
  styleUrls: ['./song-search.component.css']
})
export class SongSearchComponent implements OnInit {
  songs: Song[];

  constructor(private songService: SongService) {
    this.songService.currentSearchSongSubject.subscribe(songs => {
      this.songs = songs;
    });
  }

  ngOnInit() {
  }

}
