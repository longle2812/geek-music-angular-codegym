import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {UserService} from '../../service/user/user.service';
import {User} from '../../model/user';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {NotificationService} from '../../service/notification/notification.service';
import {AuthenticationService} from '../../service/authentication/authentication.service';

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
              private authenticationService: AuthenticationService,
              private router: Router) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getById();
    });
  }

  ngOnInit() {
  }

  getById() {
    if (this.userService.currentUser.id === this.id) {
      this.userService.findById(this.id).subscribe((user: User) => {
        this.imgSrc = user.avatarUrl;
        this.userForm = new FormGroup({
          name: new FormControl(user.name),
          address: new FormControl(user.address),
          phoneNumber: new FormControl(user.phoneNumber, [Validators.pattern('(84|0[3|5|7|8|9])+([0-9]{8})\\b'), Validators.required]),
          email: new FormControl(user.email, [Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')])
        });
      });
    } else {
      this.notificationService.showErrorMessage('You don\'t have permission to do this');
      this.router.navigateByUrl('');
    }
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
