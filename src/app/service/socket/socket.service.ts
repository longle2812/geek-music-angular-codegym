import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {NotificationService} from '../notification/notification.service';
import * as Stomp from 'stompjs'
import * as SockJS from 'sockjs-client';
import { stringify } from 'querystring';
const API_URL=`${environment.apiUrl}`

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  stompClient: any;
  notifications: Notification[] = [];
  constructor(private notificationService: NotificationService) {
      this.notificationService.getAll().subscribe(
        notifications => this.notifications = notifications
      )
  }

  connect(){
    const ws = new SockJS(`${API_URL}/ws`);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, frame =>{
      this.stompClient.subscribe('/topic/notifications', data => {
        const jsonData = JSON.parse(data.body);
        this.notifications.push(jsonData);
        console.log(this.notifications);
      })
    })
  }

  disconnect() {
    if(this.stompClient != null){
      this.stompClient.disconnect();
    }
  }

  createNotificationUsingSocket(notification){
    this.stompClient.send("/app/notifications", {}, JSON.stringify(notification));
  }
}
