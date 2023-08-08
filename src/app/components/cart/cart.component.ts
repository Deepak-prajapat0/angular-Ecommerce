import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  constructor(
    private cartService: CartService,
    private toastr: ToastrService
  ) {}
  cartDetails: any;
  cartItems: any[] = [];
  loading: boolean = false;


headers:any
  ngOnInit(): void {
    this.loading = true    
      this.cartService.getUserCart();
    this.cartService.getCartData().subscribe((data: any) => {
      if (data.cart) {
        this.cartItems = data.cart.cartItems;
        this.cartDetails = data.cart; 
        this.loading = false;
      }
     
    });
     setTimeout(() => {
       this.loading = false;
     },2500);
  }

  cartUpdate(productId: string, quantity: number) {

        // this.loader();
         this.loading = true;
    this.cartService.cartUpdate(productId, quantity);
    this.cartService.getCartData().subscribe((data: any) => {
      if (data.cart) {
        this.cartItems = data.cart.cartItems;
        this.cartDetails = data.cart;
      }
      localStorage.setItem('cart', JSON.stringify(this.cartDetails));
    });
  }

  // ngOnDestroy(): void {
  //   //Called once, before the instance is destroyed.
  //   //Add 'implements OnDestroy' to the class.
  //   this.cartService.getCartData().subscribe().unsubscribe
  // }

}
