import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {PlaylistInteractionDTO} from '../../model/playlist-interaction-dto';
import {Observable} from 'rxjs';
import {PlaylistInteraction} from '../../model/playlist-interaction';
import {SongInteractionDTO} from '../../model/song-interaction-d-t-o';
import {SongInteraction} from '../../model/songInteraction';
const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class SongInteractionService {
  constructor(private http : HttpClient) { }

  create(interactionDTO: SongInteractionDTO): Observable<SongInteraction> {
    return this.http.post<SongInteraction>(`${API_URL}/songInteractions`, interactionDTO);
  }
  update(id: number, interactionDTO : SongInteractionDTO): Observable<any> {
    return  this.http.put<SongInteraction>(`${API_URL}/songInteractions/${id}`, interactionDTO);
  }
  getFavouriteByUserAndSong(userId: number,songId: number): Observable<any> {
    return this.http.get<SongInteraction>(`${API_URL}/songInteractions/userId/${userId}/songId/${songId}`)
  }

  getFavouritesBySong(songId: number): Observable<any> {
    return this.http.get<SongInteraction[]>(`${API_URL}/songInteractions/songId/${songId}`)
  }
}
