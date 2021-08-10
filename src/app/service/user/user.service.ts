import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../model/user';
import {environment} from '../../../environments/environment';
import {UserToken} from '../../model/user-token';
import {AuthenticationService} from '../authentication/authentication.service';
import {Router} from '@angular/router';
import {NotificationService} from '../notification/notification.service';


const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: UserToken = {};

  constructor(private notificationService: NotificationService,
              private authenticationService: AuthenticationService, private http: HttpClient, private router: Router) {
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.currentUser = user;
    });
  }

  findById(id: number): Observable<User> {
    return this.http.get<User>(`${API_URL}/users/${id}`);
  }

  saveUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${API_URL}/users/edit/${id}`, user);
  }

  changePassword(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${API_URL}/users/changePass/${id}`, user);
  }


  findAll(): Observable<User[]> {
    return this.http.get<User[]>(`${API_URL}/users/list`);
  }

}
