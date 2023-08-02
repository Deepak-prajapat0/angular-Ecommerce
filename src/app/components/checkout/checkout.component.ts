import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  constructor(private cartService:CartService){}

  cartDetails:any;

  ngOnInit(): void {
    this.cartService.getUserCart()
  }
}
