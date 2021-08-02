import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Genre} from '../../model/genre';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})


export class GenreService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${API_URL}/genres`);
  }
}
