import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {NotificationService} from '../notification/notification.service';
import * as Stomp from 'stompjs'
import * as SockJS from 'sockjs-client';
import { stringify } from 'querystring';
import {UserToken} from '../../model/user-token';
import {UserService} from '../user/user.service';
import {AuthenticationService} from '../authentication/authentication.service';
import {Notification} from '../../model/notification';
const API_URL=`${environment.apiUrl}`

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  stompClient: any;
  currentUser: UserToken = {};
  listNotification: Notification[] = [];
  listNotificationUnRead: Notification[] = [];
  notifications: Notification[] = [];
  constructor(private notificationService: NotificationService,
              private userService: UserService, private authenticationService: AuthenticationService) {
  this.authenticationService.currentUserSubject.subscribe(user => {
    this.currentUser = user;
    this.getAllNotification(this.currentUser.id);
    this.getAllNotificationUnRead(this.currentUser.id);
  })
  }

  connect(){
    const ws = new SockJS(`${API_URL}/ws`);
    this.stompClient = Stomp.over(ws);
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.currentUser = user;
      this.getAllNotification(this.currentUser.id);
      this.getAllNotificationUnRead(this.currentUser.id);
    })
    this.stompClient.connect({}, frame =>{
      this.stompClient.subscribe('/topic/notifications', data => {
        const notification = JSON.parse(data.body);
        this.authenticationService.currentUserSubject.subscribe(value => {
          this.currentUser = value;
          if (this.currentUser.id == notification.recieverId){
            notification.createDate = new Date(notification.createDate);
            this.listNotificationUnRead.unshift(notification);
            this.listNotification.unshift(notification);
            console.log(this.listNotification);
          }
        })
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

  getAllNotification(id: number) {
    this.notificationService.findAllNotificationDateDesc(id).subscribe( listNotification => {
        this.listNotification = listNotification;
        this.listNotification.map(notification => {
          notification.createDate = new Date(notification.createDate);
        })
      console.log(this.listNotification);
      }
    )
  }

  getAllNotificationUnRead(id: number) {
    this.notificationService.findAllNotification(id).subscribe(listNotificationUnread => {
      this.listNotificationUnRead = listNotificationUnread;
      console.log(this.listNotificationUnRead);
    })
  }
}
