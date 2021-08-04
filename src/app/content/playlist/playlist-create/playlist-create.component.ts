import {Component, OnInit} from '@angular/core';
import {Genre} from '../../../model/genre';
import {Singer} from '../../../model/singer';
import {Songdto} from '../../../model/songdto';
import {finalize} from 'rxjs/operators';
import {SongService} from '../../../service/song/song.service';
import {GenreService} from '../../../service/genres/genre.service';
import {SingerService} from '../../../service/singer/singer.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {PlaylistService} from '../../../service/playlist/playlist.service';
import {PlaylistDTO} from '../../../model/playlist-dto';
import {NgForm} from '@angular/forms';
import {User} from '../../../model/user';
import {UserToken} from '../../../model/user-token';
import {AuthenticationService} from '../../../service/authentication/authentication.service';

@Component({
  selector: 'app-playlist-create',
  templateUrl: './playlist-create.component.html',
  styleUrls: ['./playlist-create.component.css']
})
export class PlaylistCreateComponent implements OnInit {
  selectedPlaylist = null;
  genreList: Genre[] = [];
  initGenre = 1;
  user: UserToken = {};
  playlistDTO: PlaylistDTO = {
    name: '',
    description: '',
    genres:  [],
    imgUrl: ''
  };

  constructor(private playlistService: PlaylistService,
              private genreService: GenreService,
              private storage: AngularFireStorage,
              private authenticationService: AuthenticationService,
              ) {
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.user = user;
    });

  }

  ngOnInit() {
    this.genreService.getAll().subscribe(
      genresList => this.genreList = genresList
    );
  }

  uploadFile() {
    if (this.selectedPlaylist != null) {
      const filePath = `${this.selectedPlaylist.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedPlaylist).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            console.log(url);
            this.playlistDTO.imgUrl = url;
          });
        })).subscribe();
    }
  }

  showPreview(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.playlistDTO.imgUrl = event.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedPlaylist = event.target.files[0];
      this.uploadFile();
    } else {
      this.selectedPlaylist = null;
    }
  }

  create(playlistForm: NgForm) {
    this.playlistDTO.name = playlistForm.value.name;
    this.playlistDTO.description = playlistForm.value.description;
    this.playlistDTO.genres =  {id: playlistForm.value.genres};
    this.playlistDTO.user = {id: this.user.id};
    this.playlistService.createPlayList(this.playlistDTO).subscribe(() => {
      alert('tao moi play list thanh cong');
      this.playlistDTO.name = '';
      this.playlistDTO.description = '';
      this.playlistDTO.genres = [];
      this.playlistDTO.imgUrl = '';
    });
  }
}
