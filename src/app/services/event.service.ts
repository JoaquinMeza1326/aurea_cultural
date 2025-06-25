import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventMF } from '../models/event';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  url: string = environment.baseUrl + 'CulturalEvents';

  constructor(private http: HttpClient) {}

  getEventos() {
    return this.http.get<EventMF[]>(this.url + '/' + 'list');
  }

  getById(id: number): Observable<EventMF> {
    return this.http.get<EventMF>(`${this.url}/${id}`);
  }

  add(data: any) {
    console.log(data);
    return this.http.post<EventMF>(`${this.url}/create`, data);
  }

  update(id: number, data: any): Observable<EventMF> {
    return this.http.put<EventMF>(`${this.url}/update/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  getImage(image: string) {
    return this.url + '/archivos/' + image;
  }

  upload(data: any): Observable<{ url: string }> {
    return this.http.post<{ url: string }>(`${this.url}/upload`, data);
  }
}
