import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Playlist} from '../../model/playlist';
import {BehaviorSubject, Observable} from 'rxjs';
import {PlaylistDTO} from '../../model/playlist-dto';
import {UserToken} from '../../model/user-token';
import {PlaylistInteraction} from '../../model/playlist-interaction';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  public currentPlaylistSubject: BehaviorSubject<number>;
  public currentPlaylistId: Observable<number>;
  public currentSearchPlaylistSubject: BehaviorSubject<Playlist[]>;
  public currentSearchPlaylist: Observable<Playlist[]>;
  public currentPlaylistCommentSubject: BehaviorSubject<PlaylistInteraction[]>;
  public currentPlaylistComment: Observable<PlaylistInteraction[]>;

  constructor(private http: HttpClient) {
    this.currentSearchPlaylistSubject = new BehaviorSubject<Playlist[]>([]);
    this.currentSearchPlaylist = this.currentSearchPlaylistSubject.asObservable();
    this.currentPlaylistCommentSubject = new BehaviorSubject<PlaylistInteraction[]>([]);
    this.currentPlaylistComment = this.currentPlaylistCommentSubject.asObservable();
    this.currentPlaylistSubject = new BehaviorSubject<number>(-1);
    this.currentPlaylistId = this.currentPlaylistSubject.asObservable();
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

  editPlaylistInfo(id: number, playlistDTO: PlaylistDTO): Observable<Playlist> {
    return this.http.put<Playlist>(`${API_URL}/playlists/${id}`, playlistDTO);
  }

  searchByName(name: string): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(`${API_URL}/playlists/searchByName/${name}`);
  }

  searchAdvanced(genre: string, playlistName: string, startDate: string, endDate: string, userId: number): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(`${API_URL}/playlists/searchAdvanced/${genre}/${playlistName}/${startDate}/${endDate}/${userId}`);
  }

  getAllPlaylistByListenCount(limit: number, offset: number): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(`${API_URL}/playlists/toplisten?limit=${limit}&offset=${offset}`);
  }

  getAllPlaylistByMostRecent(limit: number, offset: number): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(`${API_URL}/playlists/most_recent?limit=${limit}&offset=${offset}`)
  }

  getAllPlaylistByMostLikes(limit: number, offset: number): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(`${API_URL}/playlists/most_likes?limit=${limit}&offset=${offset}`)
  }

  addPlaylistComment(senderId: number, playlistId: number, comment: string): Observable<PlaylistInteraction> {
    // @ts-ignore
    return this.http.post<PlaylistInteraction>(`${API_URL}/playlists/addComment/${senderId}/${playlistId}/${comment}`);
  }

  getPlaylistComment(playlistId: number, page: number, size: number): Observable<PlaylistInteraction[]> {
    return this.http.get<PlaylistInteraction[]>(`${API_URL}/playlists/findCommentById/${playlistId}?page=${page}&size=${size}`);
  }

  setPlaylistLike(playlistId: number, like: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/playlists/${playlistId}/like/${like}`);
  }

  changePlaylistId(id: any) {
    this.currentPlaylistSubject.next(id);
  }
}
