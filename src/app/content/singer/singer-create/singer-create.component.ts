import {Component, OnInit} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {SingerService} from '../../../service/singer/singer.service';
import {Singer} from '../../../model/singer';
import {finalize} from 'rxjs/operators';
import {Singerdto} from '../../../model/singerdto';
import {Genre} from '../../../model/genre';
import {UserToken} from '../../../model/user-token';
import {PlaylistDTO} from '../../../model/playlist-dto';
import {PlaylistService} from '../../../service/playlist/playlist.service';
import {GenreService} from '../../../service/genres/genre.service';
import {AuthenticationService} from '../../../service/authentication/authentication.service';
import {NotificationService} from '../../../service/notification/notification.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-artist-create',
  templateUrl: './singer-create.component.html',
  styleUrls: ['./singer-create.component.css']
})
export class SingerCreateComponent implements OnInit {
  selectedSinger = null;
  genreList: Genre[] = [];
  initGenre = 1;
  user: UserToken = {};
  singerDTO: Singerdto = {
    name:'',
    band:'',
    dateOfBirth:'',
    biography:'',
    imageUrl:'',
    additionalInfo:'',
    genres:'',
    gender:'',
  };
  isSubmitted = false;

  constructor(private singerService: SingerService,
              private genreService: GenreService,
              private storage: AngularFireStorage,
              private authenticationService: AuthenticationService,
              private notificationService: NotificationService
  ) {
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.user = user;
    });

  }

  ngOnInit() {
    this.genreService.getAll().subscribe(
      genresList => {
        this.genreList = genresList;
        if (genresList.length > 0) {
          this.initGenre = genresList[0].id;
        }
      }
    );
  }

  uploadFile() {
    if (this.selectedSinger != null) {
      const filePath = `${this.selectedSinger.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedSinger).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            console.log('img url  ',url);
            this.singerDTO.imageUrl = url;
          });
        })).subscribe();
    }
  }

  showPreview(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.singerDTO.imageUrl = event.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedSinger = event.target.files[0];
      this.uploadFile();
    } else {
      this.selectedSinger = null;
    }
  }

  create(singerForm: NgForm) {

    this.isSubmitted = true;
    if (singerForm.valid) {
      // this.singerDTO.name = singerForm.value.name;
     this.singerDTO.genres = singerForm.value.genres;
      // this.singerDTO.gender = singerForm.value.gender;
      this.singerDTO.dateOfBirth = singerForm.value.dateOfBirth;
      // this.singerDTO.biography= singerForm.value.biography;
      // this.singerDTO.band= singerForm.value.band;
      // this.singerDTO.additionalInfo= singerForm.value.additionalInfo;
      this.singerDTO.user = this.user.id;
      if (this.singerDTO.imageUrl == '') {
        this.singerDTO.imageUrl = 'assets/images/album/album.jpg';
      }
      this.singerService.findSingerByName(this.singerDTO.name).subscribe(singer => {
        if(singer == null){
          this.singerService.create(this.singerDTO).subscribe(() => {
              this.notificationService.showSuccessMessage('Create success');
              singerForm.resetForm();
              this.isSubmitted = false;
            },
            () => {
              this.notificationService.showErrorMessage('Create error');
            }
          );
        }else this.notificationService.showErrorMessage('Single already exists')
      },() => {
        this.notificationService.showErrorMessage('Search singer name error');
      })
    } else {
      this.notificationService.showErrorMessage('Data invalid');

    }

  }

}
