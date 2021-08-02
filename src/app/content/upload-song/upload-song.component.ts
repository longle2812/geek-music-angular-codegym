import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm} from '@angular/forms';
import {SongService} from '../../service/song/song.service';
import {GenreService} from '../../service/genres/genre.service';
import {Genre} from '../../model/genre';
import {SingerService} from '../../service/singer/singer.service';
import {Singer} from '../../model/singer';
import {Songdto} from '../../model/songdto';

@Component({
  selector: 'app-upload-song',
  templateUrl: './upload-song.component.html',
  styleUrls: ['./upload-song.component.css']
})
export class UploadSongComponent implements OnInit {
  genreList: Genre[] = [];
  initGenre = 1;
  singerList: Singer[] = [];
  songDto: Songdto = {
    name: '',
    author: '',
    genres: null,
    singers: null
  };

  constructor(private songService: SongService,
              private genreService: GenreService,
              private singerService: SingerService) {
  }

  ngOnInit() {
    this.genreService.getAll().subscribe(
      genresList => this.genreList = genresList
    );
    this.singerService.getAll().subscribe(
      singerList => this.singerList = singerList
    );
  }


  upload(uploadSongForm: NgForm) {
    this.songDto.name = uploadSongForm.value.name;
    this.songDto.author = uploadSongForm.value.author;
    this.songDto.genres = uploadSongForm.value.genres;
    this.songDto.singers = uploadSongForm.value.singers;
    console.log(this.songDto);
    this.songService.createNewSong(this.songDto).subscribe(
      () => console.log('success')
    );
  }
}
