import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  constructor(
    private cartService: CartService,
  ) {}
  cartDetails: any ;
  cartItems: any[] = [];
  loading:boolean =false
  
  loader(){
    this.loading = true;
    setTimeout(() => {
      this.loading =false
    }, 8000);
  }

  ngOnInit(): void {
   this.loader();
    this.cartService.getUserCart().subscribe((res: any) => {
       this.cartItems = res.cart.cartItems;
       this.cartDetails = res.cart;
       this.loading = false;
     });
  }


  cartUpdate(prodctId: string, quantity: number) {
    this.loader();
    this.cartService.cartUpdate(prodctId, quantity).subscribe((res: any) => {
      this.cartItems = res.cart.cartItems;
      this.cartDetails = res.cart;
      this.loading = false;
    });
  }
}
