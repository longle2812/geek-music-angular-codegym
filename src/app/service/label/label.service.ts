import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Label} from '../../model/label';
import {environment} from '../../../environments/environment';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  constructor(private http: HttpClient) {
  }

  getAllLabel(): Observable<Label[]> {
    return this.http.get<Label[]>(`${API_URL}/labels/list`);
  }

  addTagsToSong(labelList: Label[], songId: number): Observable<any> {
    return this.http.post<any>(`${API_URL}/labels/addTags/${songId}`, labelList);
  }
}
