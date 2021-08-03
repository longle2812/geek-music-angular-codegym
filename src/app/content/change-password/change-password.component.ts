import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user/user.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {User} from '../../model/user';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  id: number;
  pwGroup: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]),
    confirmPassword: new FormControl('')
  }, this.comparePassword);

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.checkPermission();
    });
  }

  ngOnInit() {
  }

  checkPermission() {
    this.userService.findById(this.id).subscribe();
  }

  changePass() {
    if (this.pwGroup.valid) {
      const user: User = this.pwGroup.value.password;
      console.log(this.pwGroup.value.password);
      // user.password = user.password;
    }
  }

  comparePassword(c: AbstractControl) {
    const v = c.value;
    return (v.password === v.confirmPassword) ? null : {passnotmatch: true};
  }
}
