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
import {Observable} from 'rxjs';
import {NotificationService} from '../../service/notification/notification.service';

declare var $: any;

@Component({
  selector: 'app-upload-song',
  templateUrl: './upload-song.component.html',
  styleUrls: ['./upload-song.component.css']
})
export class UploadSongComponent implements OnInit {
  uploadMessage = false;
  uploadSongProgress$: Observable<number>;
  uploadImgProgress$: Observable<number>;
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
              private authenticationService: AuthenticationService,
              private notificationService: NotificationService) {
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.currentUser = user;
    });
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
          song => {
            this.notificationService.showSuccessMessage("Upload Song Completed");
            uploadSongForm.resetForm();
            this.uploadMessage = false;
            this.imgUrl = '';
            this.songUrl ='';
          }
        );
      }
    } else {
      alert('error');
    }
  }

  uploadSongUrl() {
    this.uploadMessage = false;
    if (this.selectedSong != null) {
      const filePath = `${this.selectedSong.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, this.selectedSong);
      this.uploadSongProgress$ = task.percentageChanges();

      this.uploadSongProgress$.subscribe(
        percent => {
          if (percent == 100) {
            setTimeout(() => {
              this.uploadSongProgress$ = undefined;
              task.snapshotChanges().pipe(
                finalize(() => {
                  fileRef.getDownloadURL().subscribe(url => {
                    console.log(url);
                    this.songUrl = url;
                    this.uploadMessage = true;
                  });
                })).subscribe();
            }, 1000);
          }
        }
      );
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

      const task = this.storage.upload(filePath, this.selectedImg);
      this.uploadImgProgress$ = task.percentageChanges();

      this.uploadImgProgress$.subscribe(
        percent => {
          if (percent == 100) {
            setTimeout(() => {
              this.uploadImgProgress$ = undefined;
            }, 1000);
          }
        }
      );

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
