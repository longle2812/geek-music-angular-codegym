import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../service/authentication/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  userForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    pwGroup: new FormGroup({
      password: new FormControl('', [Validators.minLength(6), Validators.maxLength(8), Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    }, this.comparePassword),
    phoneNumber: new FormControl('', [Validators.pattern('(84|0[3|5|7|8|9])+([0-9]{8})\\b'), Validators.required])
  });

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
  }

  register() {
    if (this.userForm.valid) {
      const user = this.userForm.value;
      user.password = user.pwGroup.password;
      delete user.pwGroup;
      this.authenticationService.register(user).subscribe(() => {
        console.log('account created');
      }, e => {
        console.log(e);
      });
    }
  }

  comparePassword(c: AbstractControl) {
    const v = c.value;
    return (v.password === v.confirmPassword) ? null : {passnotmatch: true};
  }
}
