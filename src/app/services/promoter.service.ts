import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Promoter } from '../models/promoter';

@Injectable({
  providedIn: 'root'
})
export class PromoterService {

  private url: string = `${environment.baseUrl}promoters`;

  constructor(private http: HttpClient) {}

  getPromotores(): Observable<Promoter[]> {
    return this.http.get<Promoter[]>(`${this.url}/list`);
  }

  getById(id: number): Observable<Promoter> {
    return this.http.get<Promoter>(`${this.url}/${id}`);
  }

  add(promoter: Promoter): Observable<Promoter> {
    console.log(promoter);
    return this.http.post<Promoter>(`${this.url}/create`, promoter);
  }

  update(id: number, promoter: Promoter): Observable<Promoter> {
    return this.http.put<Promoter>(`${this.url}/edit/${id}`, promoter);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
