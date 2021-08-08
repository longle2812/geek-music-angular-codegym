import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Singer} from '../../model/singer';
import {Observable} from 'rxjs';
import {Singerdto} from '../../model/singerdto';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class SingerService {

  constructor(private http: HttpClient) {
  }

  create(singerDTO: Singerdto): Observable<Singer> {
    return this.http.post<Singer>(`${API_URL}/singers`, singerDTO);
  }

  getAll(): Observable<Singer[]> {
    return this.http.get<Singer[]>(`${API_URL}/singers`);
  }

  getById(id: number): Observable<Singer> {
    return this.http.get<Singer>(`${API_URL}/singers/${id}`);
  }

  update(id: number,singerDTO: Singerdto): Observable<Singer> {
    return this.http.put<Singer>(`${API_URL}/${{id}}`, singerDTO);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`);
  }
}
