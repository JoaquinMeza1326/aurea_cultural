import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Sponsor } from '../models/Sponsor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SponsorService {
  private url: string = `${environment.baseUrl}sponsors`;

  constructor(private http: HttpClient) {}

  getSponsors(): Observable<Sponsor[]> {
    return this.http.get<Sponsor[]>(`${this.url}/list`);
  }

  getById(id: number): Observable<Sponsor> {
    return this.http.get<Sponsor>(`${this.url}/${id}`);
  }

  add(sponsor: Sponsor): Observable<Sponsor> {
    return this.http.post<Sponsor>(`${this.url}/create`, sponsor);
  }

  update(id: number, sponsor: Sponsor): Observable<Sponsor> {
    return this.http.put<Sponsor>(`${this.url}/edit/${id}`, sponsor);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
