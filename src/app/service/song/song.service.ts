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

  getAllSongByUserId(userId: number): Observable<Song[]> {
    return this.http.get<Song[]>(`${API_URL}/song/userId/${userId}`);
  }

  getSongByNameOrAuthor(searchValue: string, userId: number): Observable<Song[]> {
    return this.http.get<Song[]>(`${API_URL}/song/search/${searchValue}/${userId}`);
  }

  deleteSongByIdAndUserId(songId: number, userId: number): Observable<undefined> {
    return this.http.delete<undefined>(`${API_URL}/song/${userId}/${songId}`);
  }
}
