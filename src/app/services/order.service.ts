import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';

import {Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  url: string = environment.API_URL;
  orderData: any[] = [];



  getUserOrder(): Observable<any> {
    return this.http.get(`${this.url}/order`);
  }

  getOrderDetails(orderId: string): Observable<any> {
    return this.http.get(`${this.url}/order/${orderId}`);
  }
  trackOrder(orderId: string, email: string): Observable<any> {
    return this.http.get(`${this.url}/track/${orderId}/${email}`);
  }

  placeOrder(form: any, order: any): Observable<any> {
    return this.http.post(`${this.url}/order`, { form, order });
  }

  cancelItemFromOrder(orderId: string, productId: string): Observable<any> {
    return this.http.put(`${this.url}/order/${orderId}`, { productId });
  }

  cancelOrder(orderId: string): Observable<any> {
    return this.http.put(`${this.url}/order/cancel/${orderId}`, {});
  }
}
