import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TicketType } from '../models/ticketType';

@Injectable({
  providedIn: 'root',
})
export class TicketTypeService {
  private url: string = `${environment.baseUrl}ticket-types`;

  constructor(private http: HttpClient) {}

  getTicketTypes(): Observable<TicketType[]> {
    return this.http.get<TicketType[]>(`${this.url}/list`);
  }

  getById(id: number): Observable<TicketType> {
    return this.http.get<TicketType>(`${this.url}/${id}`);
  }

  add(sponsor: TicketType): Observable<TicketType> {
    return this.http.post<TicketType>(`${this.url}/create`, sponsor);
  }

  update(id: number, sponsor: TicketType): Observable<TicketType> {
    return this.http.put<TicketType>(`${this.url}/edit/${id}`, sponsor);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
