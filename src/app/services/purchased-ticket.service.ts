import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { PurcharsedTicket } from '../models/purchasedTicket';

@Injectable({
  providedIn: 'root',
})
export class PurchasedTicketService {
  private url: string = `${environment.baseUrl}purchased-tickets`;

  constructor(private http: HttpClient) {}

  getPurchasedTickets(): Observable<PurcharsedTicket[]> {
    return this.http.get<PurcharsedTicket[]>(`${this.url}/list`);
  }

  getPurchasedTicketsByClient(id: number): Observable<PurcharsedTicket[]> {
    return this.http.get<PurcharsedTicket[]>(`${this.url}/client/${id}`);
  }

  getById(id: number): Observable<PurcharsedTicket> {
    return this.http.get<PurcharsedTicket>(`${this.url}/${id}`);
  }

  add(purchasedTicket: PurcharsedTicket): Observable<PurcharsedTicket> {
    return this.http.post<PurcharsedTicket>(
      `${this.url}/create`,
      purchasedTicket
    );
  }

  update(
    id: number,
    purchasedTicket: PurcharsedTicket
  ): Observable<PurcharsedTicket> {
    return this.http.put<PurcharsedTicket>(
      `${this.url}/edit/${id}`,
      purchasedTicket
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
