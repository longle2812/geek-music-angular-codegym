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
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {UserToken} from '../../model/user-token';

@Component({
  selector: 'app-upload-song',
  templateUrl: './upload-song.component.html',
  styleUrls: ['./upload-song.component.css']
})
export class UploadSongComponent implements OnInit {
  selectedSong = null;
  selectedImg = null;
  songUrl = '';
  imgUrl = '';
  genreList: Genre[] = [];
  initGenre = 1;
  initSinger = 1;
  singerList: Singer[] = [];
  currentUser: UserToken = {};
  songDto: Songdto = {
    name: '',
    description: '',
    imgUrl: '',
    author: '',
    genres: null,
    singers: null,
    mp3Url: '',
    userId: null,
    album: ''
  };

  constructor(private songService: SongService,
              private genreService: GenreService,
              private singerService: SingerService,
              private storage: AngularFireStorage,
              private authenticationService: AuthenticationService) {
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.currentUser = user;
    });
    console.log(this.currentUser);
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
    if (uploadSongForm.valid) {
      this.songDto.name = uploadSongForm.value.name;
      this.songDto.author = uploadSongForm.value.author;
      this.songDto.genres = uploadSongForm.value.genres;
      this.songDto.singers = uploadSongForm.value.singers;
      this.songDto.description = uploadSongForm.value.description;
      this.songDto.album = uploadSongForm.value.album;
      this.songDto.mp3Url = this.songUrl;
      this.songDto.imgUrl = this.imgUrl;
      this.songDto.userId = this.currentUser.id;
      if (this.songUrl === '' || this.imgUrl === '') {
        alert('error');
      } else {
        this.songService.createNewSong(this.songDto).subscribe(
          song => console.log(song)
        );
      }
    } else {
      alert('error');
    }
  }

  uploadSongUrl() {
    if (this.selectedSong != null) {
      const filePath = `${this.selectedSong.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedSong).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            console.log(url);
            this.songUrl = url;
          });
        })).subscribe();
    }
  }

  changeSongUrl(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.songUrl = event.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedSong = event.target.files[0];
      this.uploadSongUrl();
    } else {
      this.selectedSong = null;
    }
  }

  changeImageUrl(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgUrl = event.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImg = event.target.files[0];
      this.uploadImgUrl();
    } else {
      this.selectedImg = null;
    }
  }

  private uploadImgUrl() {
    if (this.selectedImg != null) {
      const filePath = `${this.selectedImg.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImg).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            console.log(url);
            this.imgUrl = url;
          });
        })).subscribe();
    }
  }
}
