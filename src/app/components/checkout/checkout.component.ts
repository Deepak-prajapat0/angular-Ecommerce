import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { states } from '../../state';
import { OrderService } from 'src/app/services/order.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  constructor(
    private router: Router,
    private orderService: OrderService,
    private toastr: ToastrService
  ) {}

  cartDetails: any;
  states: string[] = states;
  isClassAdded: boolean = false;

  addClass(): void {
    this.isClassAdded = true;
  }

  ngOnInit(): void {
    let cart = localStorage.getItem('cart');
    if (cart) {
      this.cartDetails = JSON.parse(cart).cart;
      console.log(this.cartDetails);
      if (this.cartDetails.cartItems.length === 0) {
        this.router.navigate(['/cart']);
      }
    } else {
      this.router.navigate(['/cart']);
    }
  }

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern('^[6-9]{1}[0-9]{9}$'),
    ]),
    house: new FormControl('', [Validators.required, Validators.minLength(2)]),
    street: new FormControl('', [Validators.required, Validators.minLength(6)]),
    city: new FormControl('', [Validators.required, Validators.minLength(3)]),
    state: new FormControl('', [Validators.required, Validators.minLength(3)]),
    pincode: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6),
      Validators.pattern('^[0-9]*$'),
    ]),
  });

  get name() {
    return this.form.get('name');
  }
  get phone() {
    return this.form.get('phone');
  }
  get house() {
    return this.form.get('house');
  }
  get street() {
    return this.form.get('street');
  }
  get city() {
    return this.form.get('city');
  }
  get state() {
    return this.form.get('state');
  }
  get pincode() {
    return this.form.get('pincode');
  }

  placeOrder() {
    if (this.form.errors) {
      return;
    } else {
      this.addClass();
      this.orderService.placeOrder(this.form.value).subscribe((data: any) => {
        if (data) {
          localStorage.removeItem('cart');
          this.toastr.success(data.msg);
          setTimeout(() => {
            this.router.navigate(['/order']);
          }, 1500);
        }
      });
    }
  }
}
