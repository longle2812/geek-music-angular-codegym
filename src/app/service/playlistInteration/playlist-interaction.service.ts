import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {PlaylistDTO} from '../../model/playlist-dto';
import {Observable} from 'rxjs';
import {Playlist} from '../../model/playlist';
import {PlaylistInteractionDTO} from '../../model/playlist-interaction-dto';
import {PlaylistInteraction} from '../../model/playlist-interaction';
const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class PlaylistInteractionService {

  constructor(private http : HttpClient) { }

  create(interactionDTO: PlaylistInteractionDTO): Observable<PlaylistInteraction> {
    return this.http.post<PlaylistInteraction>(`${API_URL}/playlistInteractions`, interactionDTO);
  }
  update(id: number, interactionDTO : PlaylistInteractionDTO): Observable<any> {
    return  this.http.put<PlaylistInteraction>(`${API_URL}/playlistInteractions/${id}`, interactionDTO);
  }
  getFavouriteByUserAndPlaylistId(userId: number, playlistId: number): Observable<any> {
    return this.http.get<PlaylistInteraction>(`${API_URL}/playlistInteractions/userId/${userId}/playlistId/${playlistId}`)
  }

  getFavouritesByPlaylistId(playlistId: number): Observable<any> {
    return this.http.get<PlaylistInteraction>(`${API_URL}/playlistInteractions/playlistId/${playlistId}`)
  }
}
