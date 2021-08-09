import {Component, OnInit} from '@angular/core';
import {Song} from '../../../model/song';
import {SongService} from '../../../service/song/song.service';

@Component({
  selector: 'app-most-like-song',
  templateUrl: './most-like-song.component.html',
  styleUrls: ['./most-like-song.component.css']
})
export class MostLikeSongComponent implements OnInit {
  songs: Song[] = [];

  constructor(private songService: SongService) {
    this.songService.getSongByLikes(6, 0).subscribe(
      songs => this.songs = songs
  )
  }

  ngOnInit() {
  }

}
