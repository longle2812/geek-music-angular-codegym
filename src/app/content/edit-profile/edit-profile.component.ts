import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {UserService} from '../../service/user/user.service';
import {User} from '../../model/user';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {NotificationService} from '../../service/notification/notification.service';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  userForm: FormGroup = new FormGroup({
    name: new FormControl(),
    address: new FormControl(),
    phoneNumber: new FormControl(),
    email: new FormControl()
  });
  id: number;
  selectedImage = null;
  imgSrc = '';

  constructor(private notificationService: NotificationService, private storage: AngularFireStorage,
              private userService: UserService, private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getById();
    });
  }

  ngOnInit() {
  }

  getById() {
    this.userService.findById(this.id).subscribe((user: User) => {
      this.imgSrc = user.avatarUrl;
      this.userForm = new FormGroup({
        name: new FormControl(user.name),
        address: new FormControl(user.address),
        phoneNumber: new FormControl(user.phoneNumber),
        email: new FormControl(user.email)
      });
    });
  }

  update() {
    if (this.userForm.valid) {
      const user = this.userForm.value;
      user.avatarUrl = this.imgSrc;
      this.userService.saveUser(this.id, user).subscribe(() => {
        this.notificationService.showSuccessMessage('Profile updated!');
        this.authenticationService.currentUserAvatarSubject.next(this.imgSrc);
      }, e => {
        this.notificationService.showErrorMessage('Can not update profile');
      });
    }
  }

  uploadFile() {
    if (this.selectedImage != null) {
      const filePath = `${this.selectedImage.name.split('.').slice(0, -1).join('.')}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            this.imgSrc = url;
          });
        })).subscribe();
    }
  }


  showPreviewImg(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = event.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
      this.uploadFile();
    } else {
      this.selectedImage = null;
    }
  }
}
