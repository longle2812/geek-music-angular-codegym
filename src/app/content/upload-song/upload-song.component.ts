import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm} from '@angular/forms';
import {SongService} from '../../service/song/song.service';
import {GenreService} from '../../service/genres/genre.service';
import {Genre} from '../../model/genre';
import {SingerService} from '../../service/singer/singer.service';
import {Singer} from '../../model/singer';
import {Songdto} from '../../model/songdto';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-upload-song',
  templateUrl: './upload-song.component.html',
  styleUrls: ['./upload-song.component.css']
})
export class UploadSongComponent implements OnInit {
  selectedSong = null;
  songUrl = '';
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
              private singerService: SingerService,
              private storage: AngularFireStorage) {
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

  uploadFile() {
    if (this.selectedSong != null) {
      const filePath = `${this.selectedSong.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedSong).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            console.log(url);
          });
        })).subscribe();
    }
  }

  showPreview(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.songUrl = event.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedSong = event.target.files[0];
      this.uploadFile();
    } else {
      this.selectedSong = null;
    }
  }
}
