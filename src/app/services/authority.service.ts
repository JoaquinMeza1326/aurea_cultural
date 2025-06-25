import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Authority } from '../models/authority';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorityService {
  url: string = environment.baseUrl + 'authorities';
  constructor(private http: HttpClient) {}

  getAuthorities(): Observable<Array<Authority>> {
    return this.http.get<Array<Authority>>(`${this.url}/list`);
  }
}
