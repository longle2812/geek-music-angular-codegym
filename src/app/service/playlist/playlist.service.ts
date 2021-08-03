import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Playlist} from '../../model/playlist';
import {Observable} from 'rxjs';
import {PlaylistDTO} from '../../model/playlist-dto';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private http: HttpClient) {
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
}
