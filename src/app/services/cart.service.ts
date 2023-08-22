import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { LoggerService } from './logger.service';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
    private loggerService: LoggerService
  ) {}
  url: string = environment.API_URL;
  cartData: any;

  private cartDataSubject: BehaviorSubject<Cart[]> = new BehaviorSubject<Cart[]>(
    <any>[]
  );

  getCartData(): Observable<any> {
    return this.cartDataSubject.asObservable();
  }

  getUserCart(): void {
    let cart = localStorage.getItem('cart');    
    if (!localStorage.getItem('token') || !this.loggerService.isLoggedin) {
      if (cart) {
        this.cartData = JSON.parse(cart);
        localStorage.setItem('cart', JSON.stringify(this.cartData));
        this.toastr.success('product added to cart');
        return this.cartDataSubject.next(this.cartData); // Emit the addto cart data
      }
      else{
        return this.cartDataSubject.next(this.cartData); //
      }
    } else {
      this.http.get(`${this.url}/cart`).subscribe((response: any) => {
        this.cartData = response.cart; // Assuming the API response is an array of cart items
        this.cartDataSubject.next(this.cartData); // Emit the updated cart data
        localStorage.setItem('cart', JSON.stringify(this.cartData));
      });
    }
  }

  storeLocalCart(){
   let cart = localStorage.getItem('cart')
    if(cart){
      let localCart= JSON.parse(cart)
       if(localCart?.cartItems.length){
        this.http
          .put(`${this.url}/cart-local`, this.cartData)
          .subscribe((response: any) => {
            this.cartData = response.cart; // Assuming the API response is an array of cart items
            localStorage.setItem('cart', JSON.stringify(this.cartData));
            return this.cartDataSubject.next(this.cartData); // Emit the updated cart data
          });
       }
    }
  
  }

  addToCart(data: any): void {
    if (!localStorage.getItem('token') || !this.loggerService.isLoggedin) {
      let cart = localStorage.getItem('cart');
      if (cart) {
        let localCart = JSON.parse(cart);
        let cartItemIndex = localCart.cartItems.findIndex(
          (x: any) => x.productId._id == data._id
        );
        //  if item is already present in cart
        if (cartItemIndex >= 0) {
          let product = localCart.cartItems[cartItemIndex];
          if(product.productId.stock === product.quantity){
            this.toastr.warning("you have already added maximum quantity")
          }
          else{
           product.quantity += 1;
           localCart.totalItems += 1;
           localCart.totalPrice += product.productId.price;
           this.cartData = localCart; 
           this.toastr.success('product added to cart');
          }         
          localStorage.setItem('cart', JSON.stringify(this.cartData));
          return this.cartDataSubject.next(this.cartData);
        }
        //  if item is not present in cart
        else {
          this.cartData = {
            cartItems: [...localCart.cartItems ,{ productId: data, quantity: 1 }],
            totalItems: localCart.totalItems+1,
            totalPrice: localCart.totalPrice + data.price,
          };
          localStorage.setItem('cart', JSON.stringify(this.cartData));
          this.toastr.success('product added to cart');
          return this.cartDataSubject.next(this.cartData); // Emit the addto cart data
        }
      }
      //  if cart is not present in localStorage
      else {
        this.cartData = {
          cartItems: [{ productId: data, quantity: 1 }],
          totalItems: 1,
          totalPrice: data.price,
        };
        localStorage.setItem('cart', JSON.stringify(this.cartData));
        this.toastr.success('product added to cart');
        return this.cartDataSubject.next(this.cartData); // Emit
      }
    } 
    //  if user is logged in 
    else {
      this.http.post(`${this.url}/cart`, { id: data._id })
        .subscribe((response: any) => {
          this.cartData = response.cart; // Assuming the API response is an array of cart items
          this.cartDataSubject.next(this.cartData); // Emit the addto cart data
          localStorage.setItem('cart', JSON.stringify(this.cartData));
          this.toastr.success(response.msg);
        });
    }
  }

  
  cartUpdate(data: any, quantity: number): void {
    if (!localStorage.getItem('token') || !this.loggerService.isLoggedin) {
     let cart = localStorage.getItem('cart');
      if (cart) {
        let localCart = JSON.parse(cart);
        let cartItemIndex = localCart.cartItems.findIndex(
          (x: any) => x.productId._id == data
        );
          // index product in cartItems
        let product = localCart.cartItems[cartItemIndex];
        //  if user removed the item
        if(quantity < 1){          
          localCart.totalPrice -= product.quantity*product.productId.price
          localCart.totalItems -= product.quantity;
          localCart.cartItems.splice(cartItemIndex,1)
           this.cartData = localCart;
           localStorage.setItem('cart', JSON.stringify(localCart));
           return this.cartDataSubject.next(localCart);
        }
        //  if user increase quantity
        else if (quantity > product.quantity) {      
           if (product.productId.stock === product.quantity) {
             this.toastr.warning('you have already added maximum quantity');
           } else {
             product.quantity += 1;
             localCart.totalItems += 1;
             localCart.totalPrice += product.productId.price;
             this.cartData = localCart;
           }
          localStorage.setItem('cart', JSON.stringify(localCart));
          return this.cartDataSubject.next(localCart);
        }
        //  if user decrease quantity
        else if(quantity < product.quantity) {
           product.quantity -= 1;
           localCart.totalItems -= 1;
           localCart.totalPrice -= product.productId.price;
           this.cartData = localCart;
           localStorage.setItem('cart', JSON.stringify(localCart));
           return this.cartDataSubject.next(localCart);
        }
      }
    }
    //  if user logged in 
    else {     
      this.http.put(`${this.url}/cart`, { productId: data, quantity })
        .subscribe((response: any) => {
          this.cartData = response.cart; // Assuming the API response is an array of cart items
          this.cartDataSubject.next(this.cartData); // Emit the updated cart data
          this.toastr.success(response.msg);
          localStorage.setItem('cart', JSON.stringify(this.cartData));
        });
    }
  }
}
