import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Claim } from '../models/claim';

@Injectable({
  providedIn: 'root',
})
export class ClaimService {
  url: string = environment.baseUrl + 'claims';
  constructor(private http: HttpClient) {}

  create(claim: Claim): Observable<Claim> {
    return this.http.post<Claim>(`${this.url}/create`, claim);
  }
}
