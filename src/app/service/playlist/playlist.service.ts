import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Playlist} from '../../model/playlist';
import {BehaviorSubject, Observable} from 'rxjs';
import {PlaylistDTO} from '../../model/playlist-dto';
import {UserToken} from '../../model/user-token';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  searchPlaylist: Playlist[] = [];
  public currentSearchPlaylistSubject: BehaviorSubject<Playlist[]>;
  public currentSearchPlaylist: Observable<Playlist[]>;

  constructor(private http: HttpClient) {
    this.currentSearchPlaylistSubject = new BehaviorSubject<Playlist[]>([]);
    this.currentSearchPlaylist = this.currentSearchPlaylistSubject.asObservable();
  }

  createPlayList(playlistDTO: PlaylistDTO): Observable<Playlist> {
    return this.http.post<Playlist>(`${API_URL}/playlists`, playlistDTO);
  }

  getAllPlaylistBuyUser(id: number): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(`${API_URL}/playlists/user/${id}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/playlists/${id}`);
  }

  getPlaylist(id: number): Observable<Playlist> {
    return this.http.get<Playlist>(`${API_URL}/playlists/${id}`);
  }

  searchByName(name: string): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(`${API_URL}/playlists/searchByName/${name}`);
  }
}
