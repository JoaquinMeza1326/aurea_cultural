import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { CreateFavoriteDto, Favorite } from '../models/favorite';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private url: string = `${environment.baseUrl}favorites`;

  constructor(private http: HttpClient) {}

  getFavorites(): Observable<Favorite[]> {
    return this.http.get<Favorite[]>(`${this.url}/list`);
  }

  getFavoritesByClient(id: number): Observable<Favorite[]> {
    return this.http.get<Favorite[]>(`${this.url}/client/${id}`);
  }

  getById(id: number): Observable<Favorite> {
    return this.http.get<Favorite>(`${this.url}/${id}`);
  }

  add(favorite: CreateFavoriteDto): Observable<Favorite> {
    return this.http.post<Favorite>(`${this.url}/create`, favorite);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
