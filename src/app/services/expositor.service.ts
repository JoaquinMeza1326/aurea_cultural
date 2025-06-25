import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expositor } from '../models/expositor';

@Injectable({
  providedIn: 'root',
})
export class ExpositorService {
  private url: string = `${environment.baseUrl}expositor`;

  constructor(private http: HttpClient) {}

  getExpositors(): Observable<Expositor[]> {
    return this.http.get<Expositor[]>(`${this.url}/list`);
  }

  getById(id: number): Observable<Expositor> {
    return this.http.get<Expositor>(`${this.url}/${id}`);
  }

  add(expositor: Expositor): Observable<Expositor> {
    return this.http.post<Expositor>(`${this.url}/create`, expositor);
  }

  update(id: number, expositor: Expositor): Observable<Expositor> {
    return this.http.put<Expositor>(`${this.url}/edit/${id}`, expositor);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
