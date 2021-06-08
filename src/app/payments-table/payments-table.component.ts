import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

interface Payment {
  id?: number;
  username: string;
  amount: number;
  currency: string;
  date: string;
}

@Component({
  selector: 'app-payments-table',
  templateUrl: './payments-table.component.html',
  styleUrls: ['./payments-table.component.css']
})
export class PaymentsTableComponent implements OnInit {
  page = 1;
  pageSize = 50;
  collectionSize = 0;
  payments: Payment[] = [];
  viewPayments: Payment[] = [];

  constructor(private http: HttpClient) {
    this.refreshPayments(1);
  }

  refreshPayments(page: number) {
    this.viewPayments = this.payments
      .map((payment, i) => ({...payment, id: i + 1}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/payments', {
      headers: {
        'Authorization': 'token'
      }
    }).pipe(map(data => data)).subscribe((result: any) => {
      this.collectionSize = result.length;
      this.payments = result
      .map((payment: Payment, i: number) => ({...payment, id: i + 1}));
      this.viewPayments = this.payments.slice(0, 50);
    });
  }

}