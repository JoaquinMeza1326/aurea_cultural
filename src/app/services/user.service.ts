import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Token } from '../models/token';
import { User, UserDto } from '../models/user';
import { Authority } from '../models/authority';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url: string = environment.baseUrl + 'users';
  constructor(private http: HttpClient) {}

  login(user: User): Observable<Token> {
    return this.http.post<Token>(`${this.url}/login`, user);
  }

  create(
    username: string,
    password: string,
    active: boolean,
    authorityId: number
  ): Observable<User> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('active', active.toString())
      .set('authorityId', authorityId.toString());

    return this.http.post<User>(`${this.url}/create`, null, { params });
  }

  getAuthorities() {
    return this.http.get<Authority[]>(this.url + 'authorities/list');
  }
}
