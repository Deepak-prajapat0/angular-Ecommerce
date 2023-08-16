import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';

import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  private orderDataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    []
  );
  url: string = environment.API_URL;
  orderData: any[] = [];

  getOrderData(): Observable<any> {
    return this.orderDataSubject.asObservable();
  }

  getUserOrder(): Observable<any> {
    return this.http.get(this.url + '/order');
  }

  getOrderDetails(orderId: string) {
    return this.http.get(this.url + '/order/' + orderId);
  }

  placeOrder(form: any,order:any) {
    return this.http.post(this.url + '/order', {form,order});
  }

  cancelItemFromOrder(orderId: string, productId: string) {
    return this.http.put(this.url + '/order/' + orderId, { productId });
  }

  cancelOrder(orderId: string) {
    return this.http.put(this.url + '/order/cancel/' + orderId, {});
  }

}
