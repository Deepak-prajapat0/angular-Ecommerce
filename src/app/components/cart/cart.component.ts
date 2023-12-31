import { Component } from '@angular/core';
import { Cart } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  constructor(private cartService: CartService) {}
  cartDetails!: Cart;
  cartItems: any[] = [];
  loading: boolean = false;
  selected:boolean = false
  selectedItemIndex: number | null = null;

  selectItem(index: number) {
    this.selectedItemIndex = index;
    this.selected = true
  }

  ngOnInit(): void {
    this.loading = true;
    let cart = localStorage.getItem('cart');
    if (cart && !localStorage.getItem('token')) {
      let localCart = JSON.parse(cart);
      this.cartItems = localCart.cartItems;
      this.cartDetails = localCart;
      localStorage.setItem('cart', JSON.stringify(this.cartDetails));
      this.loading = false;
    } else if (!cart && !localStorage.getItem('token')) {
    } else {
      this.cartService.getUserCart();
      this.cartService.getCartData().subscribe((data: Cart) => {
        if (data) {
          this.cartItems = data.cartItems;
          this.cartDetails = data;
          this.loading = false;
          localStorage.setItem('cart', JSON.stringify(this.cartDetails));
        }
      });
    }
  }

  cartUpdate(productId: string, quantity: number):void {
    this.loading = true;
    this.cartService.cartUpdate(productId, quantity);
    this.cartService.getCartData().subscribe((data: Cart) => {
      if (data) {
        this.cartItems = data.cartItems;
        this.cartDetails = data;
        this.selectedItemIndex = null;
        this.selected = false;
        localStorage.setItem('cart', JSON.stringify(this.cartDetails));
      }
    });
     setTimeout(() => {
       this.loading = false;
     }, 2500);
  }
  // }
}
