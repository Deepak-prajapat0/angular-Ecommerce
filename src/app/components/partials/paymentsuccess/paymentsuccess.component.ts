import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/app/environment/environment';
import { CartService } from 'src/app/services/cart.service';
import { LoggerService } from 'src/app/services/logger.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-paymentsuccess',
  templateUrl: './paymentsuccess.component.html',
  styleUrls: ['./paymentsuccess.component.css'],
})
export class PaymentsuccessComponent {
  constructor(private http: HttpClient,private cartService:CartService,private loggerService:LoggerService) {}
  url:string = environment.API_URL;
  orderId:string=''
  loggedIn:boolean =false

  ngOnInit(): void {
    this.check();
    this.loggedIn = this.loggerService.isLoggedin;
  }
  check() {
    this.http
      .post( this.url+ '/payment-status', {
        id: JSON.parse(localStorage.getItem('paymentResponse') || '').id,
      })
      .subscribe((res:any) => {
        this.cartService.cartData = [];
        if (res.paymentIntent == 'succeeded') {
          this.orderId = res.orderId;
        } 
        localStorage.removeItem('paymentResponse');
        localStorage.removeItem('cart')
        localStorage.setItem('cart',JSON.stringify({totalItems:0}))
      });
  }
}
