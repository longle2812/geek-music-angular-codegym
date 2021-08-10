import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../../../service/notification/notification.service';
import {SocketService} from '../../../service/socket/socket.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  isShow: boolean;
  hasNotification: boolean;
  constructor(private notificationService: NotificationService, private socketService: SocketService) {
    this.isShow = false;
    this.hasNotification = false;
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
      this.socketService.getAllNotificationUnRead(userId);
      this.socketService.getAllNotification(userId);
    });
  }

}
