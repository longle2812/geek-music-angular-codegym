import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Song} from '../../model/song';
import {environment} from '../../../environments/environment';
import {Songdto} from '../../model/songdto';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})

export class SongService {

  constructor(private http: HttpClient) {
  }

  createNewSong(song: Songdto): Observable<Song> {
    return this.http.post<Song>(`${API_URL}/song`, song);
  }

}
