import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Song} from '../../model/song';
import {environment} from '../../../environments/environment';
import {Songdto} from '../../model/songdto';
import {Playlist} from '../../model/playlist';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})

export class SongService {
  public currentSearchSongSubject: BehaviorSubject<Song[]>;
  public currentSearchSong: Observable<Song[]>;

  constructor(private http: HttpClient) {
    this.currentSearchSongSubject = new BehaviorSubject<Song[]>([]);
    this.currentSearchSong = this.currentSearchSongSubject.asObservable();
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

  getSongById(id: number): Observable<Songdto> {
    return this.http.get<Songdto>(`${API_URL}/song/${id}`);
  }

  updateSong(songdto: Songdto): Observable<Song> {
    return this.http.put<Song>(`${API_URL}/song`, songdto);
  }

  searchSongByName(songName: string): Observable<Song[]> {
    return this.http.get<Song[]>(`${API_URL}/songs/findByName/${songName}`);
  }

  getTopListenSong(): Observable<Song[]> {
    return this.http.get<Song[]>(`${API_URL}/toplisten`);
  }

  getSongsSortByCreateTime(offset: number, limit: number): Observable<Song[]> {
    return this.http.get<Song[]>(`${API_URL}/song/new?offset=${offset}&limit=${limit}`);
  }
}
