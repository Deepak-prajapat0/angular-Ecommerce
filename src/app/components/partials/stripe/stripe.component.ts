import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentService } from '../../../services/payment.service';
declare var Stripe:any;

@Component({
  selector: 'payment-form',
  templateUrl: './stripe.component.html',
})
export class StripePayment {

  
  @Input()
  order!: any;
  @Input()
  form!:any
  
  handler: any;
  loading:boolean =false

  constructor(private paymentService:PaymentService){}


  onPayment() {
    this.loading = true
    this.paymentService.payment(this.order)
      .subscribe(async (res: any) => {
        let stripe = await loadStripe(
          'pk_test_51NdRM1SGor658vyKfuSsZbktNn3sUMNAWjvXR6EfEAz8SYEK8n8hsQpIY81ZBpc4WTpjb0Ozs1k5LWPFwN1v9E3W00hsS1gbP2'
        );
        localStorage.setItem('paymentResponse', JSON.stringify(res));
        console.log('paymentResponse', stripe);

        stripe?.redirectToCheckout({
          sessionId: res.id,
        });
        this.loading = false
      });
    // localStorage.removeItem(this.cartService.encryptText());
    // this.cartService.clearCart();
    // this.cartService.storeCart();
  }
}