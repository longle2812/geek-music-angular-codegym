import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Singer} from '../../model/singer';
import {BehaviorSubject, Observable} from 'rxjs';
import {Singerdto} from '../../model/singerdto';
import {Playlist} from '../../model/playlist';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class SingerService {
  public currentSearchSingerSubject: BehaviorSubject<Singer[]>;
  public currentSearchSinger: Observable<Singer[]>;

  constructor(private http: HttpClient) {
    this.currentSearchSingerSubject = new BehaviorSubject<Playlist[]>([]);
    this.currentSearchSinger = this.currentSearchSingerSubject.asObservable();
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

  update(id: number, singerDTO: Singerdto): Observable<Singer> {
    return this.http.put<Singer>(`${API_URL}/${{id}}`, singerDTO);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`);
  }

  searchByName(name: string): Observable<Singer[]> {
    return this.http.get<Singer[]>(`${API_URL}/singers/findByName/${name}`);
  }

  searchAdvanced(songName: string, userName: string, genreName: string, startDate: string, endDate: string): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(`${API_URL}/singers/findSingerFull/${songName}/${userName}/${genreName}/${startDate}/${endDate}`);
  }
}
