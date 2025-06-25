import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private url: string = `${environment.baseUrl}transactions`;

  constructor(private http: HttpClient) {}

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.url}/list`);
  }

  getTransactionsByClient(id: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.url}/listByIdUsu/${id}`);
  }

  getById(id: number): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.url}/${id}`);
  }

  add(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.url}/create`, transaction);
  }

  update(id: number, transaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.url}/edit/${id}`, transaction);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
