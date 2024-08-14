import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Summary, Transaction } from '../models/Transactions';

@Injectable({
  providedIn: 'root'
})

export class TransactionService {
  private apiUrl = 'http://localhost:8080/api/transactions'; 

  constructor(private http: HttpClient) { }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl);
  }
  getTransactionsTotals(): Observable<Summary> {
    return this.http.get<Summary>(this.apiUrl + "/summary");
  }
  getTransactionsById(id:string): Observable<Transaction> {
    return this.http.get<Transaction>(this.apiUrl + "/" + id);
  }
  addTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.apiUrl, transaction);
  }
  updateTransaction(id: string, transaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.apiUrl}/${id}`, transaction);
  }
  deleteTransaction(id: string): Observable<Transaction> {
    return this.http.delete<Transaction>(`${this.apiUrl}/${id}`);
  }
}