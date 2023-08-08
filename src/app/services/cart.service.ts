import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environment/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
    private loggerService: LoggerService
  ) {}
  url: string = environment.apiUrl;
  count: number = 0;
  cartData: [] = [];

  private cartDataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  getCartData(): Observable<any> {
    return this.cartDataSubject.asObservable();
  }

  getUserCart(): void {
    this.http
      .get(this.url + '/cart')
      .subscribe(
        (response: any) => {
          this.cartData = response; // Assuming the API response is an array of cart items
          this.cartDataSubject.next(this.cartData); // Emit the updated cart data
          localStorage.setItem('cart', JSON.stringify(this.cartData));
        },
        (error) => {
          this.toastr.error(error.error.msg || error.error.error);
          if (error.status === 500 || error.status === 401) {
            localStorage.removeItem('token');
            this.loggerService.isLoggedin = false;
          }
        }
      );
  }

  addToCart(id: string): void {
    this.http
      .post(
        this.url + '/cart',
        { id: id },
      )
      .subscribe(
        (response: any) => {
          this.cartData = response; // Assuming the API response is an array of cart items
          this.cartDataSubject.next(this.cartData); // Emit the updated cart data
          localStorage.setItem('cart', JSON.stringify(this.cartData));
          this.toastr.success(response.msg);
        },
        (error) => {
          this.toastr.warning("please login again");
        }
      );
  }
  cartUpdate(productId: string, quantity: number): void {
    this.http
      .put(this.url + '/cart', { productId, quantity })
      .subscribe(
        (response: any) => {
          this.cartData = response; // Assuming the API response is an array of cart items
          this.cartDataSubject.next(this.cartData); // Emit the updated cart data
          this.toastr.success(response.msg);
          localStorage.setItem('cart', JSON.stringify(this.cartData));
        },
        (error) => {
          this.toastr.error(error.error.msg);
        }
      );
  }
}
