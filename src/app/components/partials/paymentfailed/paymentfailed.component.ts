import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/app/environment/environment';

@Component({
  selector: 'app-paymentfailed',
  templateUrl: './paymentfailed.component.html',
  styleUrls: ['./paymentfailed.component.css'],
})
export class PaymentfailedComponent {
  constructor(private http: HttpClient) {}
  url: string = environment.API_URL;

  ngOnInit(): void {
    this.check();
  }
  check() {
    this.http
      .post(this.url+'/payment-status', {
        id: JSON.parse(localStorage.getItem('paymentResponse') || '').id,
      })
      .subscribe((res) => {
        localStorage.setItem('paymentIntent', JSON.stringify(res));
      });
  }
}
