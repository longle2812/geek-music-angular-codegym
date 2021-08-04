import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthenticationService} from '../service/authentication/authentication.service';
import {Router} from '@angular/router';
import {NotificationService} from '../service/notification/notification.service';
import {UserService} from '../service/user/user.service';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });
  errorMsg = '';

  constructor(private userService: UserService, private notificationService: NotificationService,
              private authenticationService: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
  }

  login() {
    // if (this.userForm.valid) {
    //   this.authenticationService.login(this.userForm.get('username').value,
    //     this.userForm.get('password').value).subscribe(userToken => {
    //       $('#myModal1').modal('hide');
    //       this.notificationService.showSuccessMessage('Login success');
    //       this.userService.findById(userToken.id).subscribe(user => {
    //         this.authenticationService.currentUserAvatarSubject.next(user.avatarUrl);
    //       });
    //       this.userForm.reset();
    //       this.reloadCurrentRoute();
    //     },
    //     e => {
    //       this.errorMsg = 'Wrong username or password!';
    //     }
    //   );
    // }
    this.notificationService.showSuccessMessage('success');
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
      // console.log(currentUrl);
    });
  }
}
