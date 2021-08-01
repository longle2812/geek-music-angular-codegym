import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthenticationService} from '../service/authentication/authentication.service';

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

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
  }

  login() {
    if (this.userForm.valid) {
      this.authenticationService.login(this.userForm.get('username').value, this.userForm.get('password').value).subscribe(() => {
          console.log('success');
        },
        e => {
          console.log(e);
        }
      );
    }
  }
}
