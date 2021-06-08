import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { PaymentForm } from './payment';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {
  currencies = ['EUR', 'USD'];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  model = new PaymentForm('', 0, '');

  submitted = false;

  onSubmit() {
    this.submitted = true;
    this.http.post('http://localhost:3000/payments', this.model, {
      headers: {
        'Authorization': 'token'
      }
    }).pipe(map(data => data)).subscribe((result: any) => {
      console.log(result)
    });
  }
}

