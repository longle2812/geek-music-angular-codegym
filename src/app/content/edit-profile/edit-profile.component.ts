import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {UserService} from '../../service/user.service';
import {User} from '../../model/user';

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

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getById();
    });
  }

  ngOnInit() {
  }

  getById() {
    this.userService.findById(this.id).subscribe((user: User) => {
      this.userForm = new FormGroup({
        name: new FormControl(user.name),
        address: new FormControl(user.address),
        phoneNumber: new FormControl(user.phoneNumber),
        email: new FormControl(user.email)
      });
    });
  }

  update() {

  }
}
