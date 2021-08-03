import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserToken} from '../../model/user-token';
import {map} from 'rxjs/operators';
import {User} from '../../model/user';


const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public currentUserSubject: BehaviorSubject<UserToken>;
  public currentUser: Observable<UserToken>;
  public currentUserAvatarSubject: BehaviorSubject<string>;
  public currentUserAvatar: Observable<string>;

  // private userService: UserService,
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserToken>(JSON.parse(localStorage.getItem('user')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentUserAvatarSubject = new BehaviorSubject<string>('');
    this.currentUserAvatar = this.currentUserAvatarSubject.asObservable();
  }

  login(username: string, password: string) {
    return this.http.post<any>(API_URL + '/login', {username, password})
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  get currentUserValue() {
    return this.currentUserSubject.value;
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${API_URL}/signup`, user);
  }
}
