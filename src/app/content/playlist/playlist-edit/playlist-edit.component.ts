import { Component, OnInit } from '@angular/core';
import {Genre} from '../../../model/genre';
import {UserToken} from '../../../model/user-token';
import {PlaylistDTO} from '../../../model/playlist-dto';
import {PlaylistService} from '../../../service/playlist/playlist.service';
import {GenreService} from '../../../service/genres/genre.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {AuthenticationService} from '../../../service/authentication/authentication.service';
import {finalize} from 'rxjs/operators';
import {NgForm} from '@angular/forms';
import {Playlist} from '../../../model/playlist';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../../service/notification/notification.service';

@Component({
  selector: 'app-playlist-edit',
  templateUrl: './playlist-edit.component.html',
  styleUrls: ['./playlist-edit.component.css']
})
export class PlaylistEditComponent implements OnInit {

  selectedPlaylist = null;
  genreList: Genre[] = [];
  initGenre = -1;
  user: UserToken = {};
  playlistDTO: PlaylistDTO = {
    name: '',
    description:'',
    genres: {},
    imgUrl:''
  };
  idPlaylist: number =-1;
  isSubmitted = false;
  constructor(private playlistService: PlaylistService,
              private genreService: GenreService,
              private storage: AngularFireStorage,
              private authenticationService: AuthenticationService,
              private activatedRouter: ActivatedRoute,
              private router: Router,
              private notificationService: NotificationService
  ) {
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.user = user;
    });
    this.activatedRouter.paramMap.subscribe(paramMap =>{
      const id = paramMap.get('id');
      this.getPlaylist(id);
    })

  }

  ngOnInit() {
    this.genreService.getAll().subscribe(
      genresList => {
        this.genreList = genresList;
        if(genresList.length>0){
          this.initGenre = genresList[0].id;
        }
      }
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
  private getPlaylist(id) {
    this.playlistService.getPlaylist(id).subscribe(playlist => {
      this.playlistDTO.name = playlist.name;
      this.playlistDTO.description = playlist.description;
      if(playlist.genres.length > 0){
        this.playlistDTO.genres = playlist.genres[0];
      }
      this.playlistDTO.imgUrl = playlist.imgUrl;
      this.idPlaylist = playlist.id;
    });
  }
  edit(playlistForm: NgForm) {
    this.isSubmitted = true;
    if(playlistForm.valid ){
      let isEdit = confirm('Edit info playlist?');
      if(isEdit){
        this.playlistDTO.name = playlistForm.value.name;
        this.playlistDTO.description = playlistForm.value.description;
        this.playlistDTO.genres =  {id: playlistForm.value.genres};
        this.playlistService.editPlaylistInfo(this.idPlaylist,this.playlistDTO).subscribe(() => {
          this.notificationService.showSuccessMessage('edit success')
          this.isSubmitted = false;
          this.router.navigateByUrl('/playlist/'+ this.idPlaylist);
        },
          ()=> {
            this.notificationService.showErrorMessage('edit error')
          }
        )
      }
    }else {
      this.notificationService.showErrorMessage('Data invalid')
    }

  }
}
