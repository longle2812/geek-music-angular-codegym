import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../model/user';
import {environment} from '../../../environments/environment';
import {UserToken} from '../../model/user-token';
import {AuthenticationService} from '../authentication/authentication.service';


const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: UserToken = {};

  constructor(private authenticationService: AuthenticationService, private http: HttpClient) {
    this.authenticationService.currentUserSubject.subscribe(user => {
      this.currentUser = user;
    });
  }

  findById(id: number): Observable<User> {
    if (this.currentUser.id === id) {
      return this.http.get<User>(`${API_URL}/users/${id}`);
    }
    alert('You don\'t have permission to do this');
  }

  saveUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${API_URL}/users/edit/${id}`, user);
  }
}
