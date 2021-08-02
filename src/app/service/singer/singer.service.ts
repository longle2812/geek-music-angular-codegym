import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Singer} from '../../model/singer';
import {environment} from '../../../environments/environment';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class SingerService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Singer[]> {
    return this.http.get<Singer[]>(`${API_URL}/singers`);
  }
}
