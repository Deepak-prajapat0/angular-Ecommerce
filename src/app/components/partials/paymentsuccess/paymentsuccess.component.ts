import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/app/environment/environment';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-paymentsuccess',
  templateUrl: './paymentsuccess.component.html',
  styleUrls: ['./paymentsuccess.component.css'],
})
export class PaymentsuccessComponent {
  constructor(private http: HttpClient,private cartService:CartService) {}
  url:string = environment.API_URL;

  ngOnInit(): void {
    this.check();
  }
  check() {
    this.http
      .post( this.url+ '/payment-status', {
        id: JSON.parse(localStorage.getItem('paymentResponse') || '').id,
      })
      .subscribe((res) => {
        this.cartService.cartData = '';
        localStorage.setItem('paymentIntent', JSON.stringify(res));
        localStorage.removeItem('cart')
      });
  }
}
