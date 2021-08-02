import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/user';
import {environment} from '../../environments/environment';


const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  findById(id: number): Observable<User> {
    return this.http.get<User>(`${API_URL}/users/${id}`);
  }
}
