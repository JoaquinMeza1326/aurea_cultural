import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { City } from '../models/city';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  url: string = environment.baseUrl + 'cities';
  constructor(private http: HttpClient) {}

  getCities(): Observable<Array<City>> {
    return this.http.get<Array<City>>(`${this.url}/list`);
  }

  create(city: City): Observable<City> {
    return this.http.post<City>(`${this.url}/create`, city);
  }

  getById(id: number): Observable<City> {
    return this.http.get<City>(`${this.url}/${id}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  update(id: number, city: City): Observable<City> {
    return this.http.put<City>(`${this.url}/edit/${id}`, city);
  }
}
