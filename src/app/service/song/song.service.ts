import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Song} from '../../model/song';
import {environment} from '../../../environments/environment';
import {Songdto} from '../../model/songdto';
import {Playlist} from '../../model/playlist';
import {PlaylistInteraction} from '../../model/playlist-interaction';
import {SongInteraction} from '../../model/song-interaction';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})

export class SongService {
  public currentSearchSongSubject: BehaviorSubject<Song[]>;
  public currentSearchSong: Observable<Song[]>;
  public currentSongSubject: BehaviorSubject<number>;
  public currentSongId: Observable<number>;

  constructor(private http: HttpClient) {
    this.currentSearchSongSubject = new BehaviorSubject<Song[]>([]);
    this.currentSearchSong = this.currentSearchSongSubject.asObservable();
    this.currentSongSubject = new BehaviorSubject<number>(-1);
    this.currentSongId = this.currentSongSubject.asObservable();
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

  searchSongAdvance(songName: string, userName: string, genreName: string, statDate: string, endDate: string): Observable<Song[]> {
    return this.http.get<Song[]>(`${API_URL}/songs/findSongFull/${songName}/${userName}/${genreName}/${statDate}/${endDate}`);
  }

  addSongToPlayList(songId: number, playlistId: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/playlists/${songId}/${playlistId}`);
  }

  changeSongId(songID: any) {
    this.currentSongSubject.next(songID);
  }

  getSongBySingerId(id: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/singers/${id}/songs`);
  }

  getSongByLikes(limit: number, offset: number): Observable<Song[]> {
    return this.http.get<Song[]>(`${API_URL}/most_likes?limit=${limit}&offset=${offset}`);
  }

  findSongById(id: number): Observable<Song> {
    return this.http.get<Song>(`${API_URL}/songs/${id}`);
  }

  addSongComment(senderId: number, songId: number, comment: string): Observable<SongInteraction> {
    // @ts-ignore
    return this.http.post<SongInteraction>(`${API_URL}/songs/addComment/${senderId}/${songId}/${comment}`);
  }

  getSongComment(songId: number, page: number, size: number): Observable<SongInteraction[]> {
    return this.http.get<SongInteraction[]>(`${API_URL}/songs/findCommentById/${songId}?page=${page}&size=${size}`);
  }
}
