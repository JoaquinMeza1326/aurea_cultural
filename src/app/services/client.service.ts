import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  url: string = environment.baseUrl + 'clients';

  constructor(private http: HttpClient) {}

  getClients() {
    return this.http.get<Client>(this.url + '/' + 'list');
  }

  getById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.url}/${id}`);
  }

  add(data: Client) {
    return this.http.post<Client>(`${this.url}/create`, data);
  }

  update(id: number, data: Client): Observable<Client> {
    return this.http.put<Client>(`${this.url}/update/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
