import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user/user.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {User} from '../../model/user';
import {NotificationService} from '../../service/notification/notification.service';

declare var $: any;

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  id: number;
  emptyError = '';
  pwGroup: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]),
    confirmPassword: new FormControl('')
  }, this.comparePassword);

  constructor(private notificationService: NotificationService, private userService: UserService,
              private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.checkPermission();
    });
  }

  ngOnInit() {
  }

  checkPermission() {
    if (this.userService.currentUser.id !== this.id) {
      this.notificationService.showErrorMessage('You don\'t have permission to do this');
      this.router.navigateByUrl('');
    }
  }

  changePass() {
    const oldPass = $('#old_pass').val();
    this.pwGroup.markAllAsTouched();
    if (oldPass.length === 0) {
      this.emptyError = 'This is required';
    } else {
      this.emptyError = '';
      if (this.pwGroup.valid && oldPass.length > 0) {
        // tslint:disable-next-line:prefer-const
        let user: User = {password: ''};
        user.password = this.pwGroup.value.password;
        this.userService.changePassword(this.id, user, oldPass).subscribe(() => {
          this.notificationService.showSuccessMessage('Success');
          this.pwGroup.reset();
        }, (e) => {
          if (e.error === 'duplicate password') {
            this.notificationService.showErrorMessage('New password can not be your old password');
          } else if (e.error === 'old pass not match') {
            this.notificationService.showErrorMessage('Your old password is not correct!');
          } else {
            this.notificationService.showErrorMessage('Can not change password');
          }
        });
      }
    }
  }

  comparePassword(c: AbstractControl) {
    const v = c.value;
    return (v.password === v.confirmPassword) ? null : {passnotmatch: true};
  }

  togglePassword() {
    const passInput = $('#password_input')[0];
    const confirmPassInput = $('#confirm_pass_input')[0];
    const oldPassInput = $('#old_pass')[0];
    if (passInput.type === 'password') {
      passInput.type = 'text';
      confirmPassInput.type = 'text';
      oldPassInput.type = 'text';
    } else {
      passInput.type = 'password';
      confirmPassInput.type = 'password';
      oldPassInput.type = 'password';
    }
  }
}
