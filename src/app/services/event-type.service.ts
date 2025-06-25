import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { EventType } from '../models/eventType';

@Injectable({
  providedIn: 'root',
})
export class EventTypeService {
  url: string = environment.baseUrl + 'event-types';

  constructor(private http: HttpClient) {}

  getTipoEventos() {
    return this.http.get<EventType[]>(this.url + '/' + 'list');
  }

  getById(id: number): Observable<EventType> {
    return this.http.get<EventType>(`${this.url}/${id}`);
  }

  add(eventType: EventType): Observable<EventType> {
    return this.http.post<EventType>(`${this.url}/create`, eventType);
  }

  update(id: number, eventType: EventType): Observable<EventType> {
    return this.http.put<EventType>(`${this.url}/edit/${id}`, eventType);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
