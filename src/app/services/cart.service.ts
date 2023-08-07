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
  headers: any;
  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
    private loggerService: LoggerService
  ) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': localStorage.getItem('token') || '',
    });
  }
  url: string = environment.apiUrl;
  count: number = 0;
  cartData: [] = [];

  private cartDataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    []
  );

  getCartData(): Observable<any> {
    return this.cartDataSubject.asObservable();
  }

  getUserCart(headers: any): void {
    this.http
      .get(this.url + '/cart', {
        headers: headers,
      })
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

  addToCart(headers:any,id: string): void {
    this.http
      .post(
        this.url + '/cart',
        { id: id },
        {
          headers: headers,
        }
      )
      .subscribe(
        (response: any) => {
          this.cartData = response; // Assuming the API response is an array of cart items
          this.cartDataSubject.next(this.cartData); // Emit the updated cart data
          localStorage.setItem('cart', JSON.stringify(this.cartData));
          this.toastr.success(response.msg);
        },
        (error) => {
          this.toastr.error(error.error.msg);
        }
      );
  }
  cartUpdate(productId: string, quantity: number, headers: any): void {
    this.http
      .put(this.url + '/cart', { productId, quantity }, { headers: headers })
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
