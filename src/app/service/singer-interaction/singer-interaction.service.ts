import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PlaylistInteractionDTO} from '../../model/playlist-interaction-dto';
import {Observable} from 'rxjs';
import {PlaylistInteraction} from '../../model/playlist-interaction';
import {environment} from '../../../environments/environment';
import {SingerInteraction} from '../../model/singer-interaction';
import {SingerInteractionDTO} from '../../model/singer-interaction-dto';
const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class SingerInteractionService {

  constructor(private http : HttpClient) { }

  create(interactionDTO: SingerInteractionDTO): Observable<SingerInteraction> {
    return this.http.post<SingerInteraction>(`${API_URL}/singerInteractions`, interactionDTO);
  }
  update(id: number, interactionDTO : SingerInteractionDTO): Observable<any> {
    return  this.http.put<SingerInteraction>(`${API_URL}/singerInteractions/${id}`, interactionDTO);
  }
  getFavouriteByUserAndSingerId(userId: number, singerId: number): Observable<any> {
    return this.http.get<PlaylistInteraction>(`${API_URL}/singerInteractions/userId/${userId}/singerId/${singerId}`)
  }

  getFavouritesBySingerId(singerId: number): Observable<any> {
    return this.http.get<PlaylistInteraction>(`${API_URL}/singerInteractions/singerId/${singerId}`)
  }
}
