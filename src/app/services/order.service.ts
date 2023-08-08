import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { ToastrService } from 'ngx-toastr';
import { Route, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient,private toastr:ToastrService,private loggerService:LoggerService,private router:Router) {}

  private orderDataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    []
  );
  url: string = environment.apiUrl;
  orderData:any[]=[]

  getOrderData():Observable<any>{
    return this.orderDataSubject.asObservable()
  }

  getUserOrder():Observable<any> {
    return this.http.get(this.url + '/order')
  }

  getOrderDetails(orderId:string){
      return this.http.get(this.url + '/order/'+ orderId)
       
  }

  placeOrder(form: any) {
    return this.http.post(this.url + '/order', form)
  }

  cancelItemFromOrder(orderId:string,productId:string){    
     return this.http.put(this.url + '/order/' + orderId,{productId})
  }

  cancelOrder(orderId: string) {
    return this.http.put(this.url + '/order/cancel/' + orderId, {})
  }
}
