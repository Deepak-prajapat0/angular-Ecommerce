import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentService } from '../../services/payment.service';
import { OrderService } from 'src/app/services/order.service';
import { CartService } from 'src/app/services/cart.service';
declare var Stripe:any;

@Component({
  selector: 'payment-form',
  templateUrl: './stripe.component.html',
})
export class StripePayment {
  @Input()
  order!: any;
  @Input()
  form!: any;
  @Input()
  formStatus!:any

  loading: boolean = false;

  constructor(
    private paymentService: PaymentService,
    private orderService: OrderService
  ) {}

  onPayment() {
    this.loading = true;
    this.orderService.placeOrder(this.form, this.order).subscribe((res) => {
      this.paymentService
        .payment(this.order, this.form)
        .subscribe(async (res: any) => {
          let stripe = await loadStripe(
            'pk_test_51NdRM1SGor658vyKfuSsZbktNn3sUMNAWjvXR6EfEAz8SYEK8n8hsQpIY81ZBpc4WTpjb0Ozs1k5LWPFwN1v9E3W00hsS1gbP2'
          );
          localStorage.setItem('paymentResponse', JSON.stringify(res));
          stripe?.redirectToCheckout({
            sessionId: res.id,
          })
        });
    });
    setTimeout(() => {
      this.loading = false
    }, 2500);
  }
}