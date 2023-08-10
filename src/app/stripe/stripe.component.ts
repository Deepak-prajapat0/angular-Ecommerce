import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
declare var Stripe:any;

@Component({
  selector: 'app-payment-form',
  templateUrl: './stripe.component.html',
})
export class StripePayment {
  paymentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.paymentForm = this.fb.group({
      cardNumber: [''],
      expMonth: [''],
      expYear: [''],
      cvc: [''],
    });
  }

  onSubmit() {
    const card = {
      number: this.paymentForm.value.cardNumber,
      exp_month: this.paymentForm.value.expMonth,
      exp_year: this.paymentForm.value.expYear,
      cvc: this.paymentForm.value.cvc,
    };

    Stripe.createToken(card).then((result:any) => {
      if (result.error) {
        // Handle error
      } else {
        // Send the token to your server for further processing
        const token = result.token.id;
        // Send token to your server
      }
    });
  }
}
