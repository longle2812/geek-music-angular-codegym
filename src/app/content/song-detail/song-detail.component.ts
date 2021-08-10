import {Component, OnInit} from '@angular/core';
import {SongService} from '../../service/song/song.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GenreService} from '../../service/genres/genre.service';
import {SingerService} from '../../service/singer/singer.service';
import {Genre} from '../../model/genre';
import {Singer} from '../../model/singer';
import {finalize} from 'rxjs/operators';
import {NotificationService} from '../../service/notification/notification.service';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.css']
})
export class SongDetailComponent implements OnInit {
  selectedSong = null;
  selectedImg = null;
  imgUploadedSrc = '';
  songUploadedName = '';
  songUrl = '';
  imgUrl = '';
  genreList: Genre[] = [];
  singerList: Singer[] = [];
  songDetailForm: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', [Validators.minLength(8), Validators.required]),
    description: new FormControl(),
    imgUrl: new FormControl(),
    author: new FormControl('', [Validators.minLength(6), Validators.required]),
    genres: new FormControl(),
    singers: new FormControl(),
    mp3Url: new FormControl(),
    userId: new FormControl(),
    album: new FormControl(),
  });

  constructor(private songService: SongService,
              private storage: AngularFireStorage,
              private activatedRoute: ActivatedRoute,
              private genresService: GenreService,
              private singerService: SingerService,
              private notificationService: NotificationService,) {
    this.activatedRoute.paramMap.subscribe(paramMap => {
        const id = paramMap.get('id');
        this.songService.getSongById(Number(id)).subscribe(songDto => {
            this.songDetailForm.setValue(songDto);
            this.songUploadedName = songDto.mp3Url;
            this.imgUploadedSrc = songDto.imgUrl;
          }
        );
      }
    );
    this.genresService.getAll().subscribe(
      genreList => this.genreList = genreList
    );
    this.singerService.getAll().subscribe(
      singerList => this.singerList = singerList
    );
  }

  ngOnInit() {
  }

  uploadSongUrl() {
    if (this.selectedSong != null) {
      const filePath = `${this.selectedSong.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedSong).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            this.songUrl = url;
            this.songUploadedName = this.selectedSong.name;
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
            this.imgUrl = url;
            this.imgUploadedSrc = url;
          });
        })).subscribe();
    }
  }

  updateDetail() {
    if (this.songDetailForm.valid) {
      if (this.songUrl !== '') {
        this.songDetailForm.patchValue({
          mp3Url: this.songUrl
        });
      }
      if (this.imgUrl !== '') {
        this.songDetailForm.patchValue({
          imgUrl: this.imgUrl
        });
      }
      this.songService.updateSong(this.songDetailForm.value).subscribe(song =>
        this.notificationService.showSuccessMessage('Update completed')
      )} else {
      this.notificationService.showErrorMessage('Something\'s wrong');
    }
  }

  get f() {
    return this.songDetailForm.controls;
  }

}
