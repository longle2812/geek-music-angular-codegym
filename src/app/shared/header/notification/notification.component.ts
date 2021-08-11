import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../../../service/notification/notification.service';
import {SocketService} from '../../../service/socket/socket.service';
import {UserToken} from '../../../model/user-token';
import {AuthenticationService} from '../../../service/authentication/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  isShow: boolean;
  hasNotification: boolean;
  currentUser: UserToken = {};
  constructor(private notificationService: NotificationService,
              private socketService: SocketService,
              private authenticationService: AuthenticationService,
              private router: Router) {
    this.isShow = false;
    this.hasNotification = false;
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {

  }

  getNotification(id: number) {
    return this.notificationService.getNotification(id).toPromise();
  }

  async updateStatus(notificationId: number, userId: number) {
    let notification = await this.getNotification(notificationId);
    notification.status = true;
    this.notificationService.updateNotification(notificationId, notification).subscribe(() => {
      this.isShow = false;
      this.router.navigateByUrl(notification.link);
      this.socketService.getAllNotificationUnRead(userId);
      this.socketService.getAllNotification(userId);

    });
  }

  changeAllStatus() {
      this.notificationService.changeAllStatus(this.currentUser.id).subscribe(()=>{
        this.socketService.getAllNotificationUnRead(this.currentUser.id);
        this.socketService.getAllNotification(this.currentUser.id);
      })
  }
}
