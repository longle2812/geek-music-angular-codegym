import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Notification} from '../../model/notification';

declare var $: any;
declare var toastr: any;

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) {
  }

  showSuccessMessage(message) {
    $(() => {
      toastr.options.closeButton = true;
      toastr.options.closeMethod = 'fadeOut';
      toastr.options.closeDuration = 300;
      toastr.options.closeEasing = 'swing';
      toastr.success(message);
    });
  }

  showErrorMessage(message) {
    $(() => {
      toastr.options.closeButton = true;
      toastr.options.closeMethod = 'fadeOut';
      toastr.options.closeDuration = 300;
      toastr.options.closeEasing = 'swing';
      toastr.error(message);
    });
  }

  showLogoutMessage(msg) {
    $(() => {
      toastr.options.closeButton = true;
      toastr.options.closeMethod = 'fadeOut';
      toastr.options.closeDuration = 300;
      toastr.options.closeEasing = 'swing';
      toastr.info(msg);
    });
  }

  getAll(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${API_URL}/notifications`);
  }

  createNotification(notification: Notification): Observable<Notification> {
    return this.http.post<Notification>(`${API_URL}/notifications`, notification);
  }

  findAllNotificationDateDesc(id: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${API_URL}/users/${id}/notifications-desc`);
  }

  findAllNotification(id: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${API_URL}/users/${id}/notifications`);

  }

  getNotification(id: number): Observable<Notification> {
    return this.http.get<Notification>(API_URL + `/notifications/${id}`)
  }

  updateNotification(id: number, notification: Notification): Observable<Notification> {
    return this.http.put<Notification>(API_URL + `/notifications/${id}`, notification)
  }

  changeAllStatus(id: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/notifications/changeAll/${id}`);
  }
}
