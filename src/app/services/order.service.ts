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

  getUserOrder() {
    return this.http
      .get(this.url + '/order')
      .subscribe(
        (response: any) => {
          this.orderData = response; // Assuming the API response is an array of cart items
          this.orderDataSubject.next(this.orderData); // Emit the updated cart dat
          
        },
        (error) => {
          this.toastr.error(error.error.msg || error.error.error);
          if (error.status === 500 || error.status === 401) {
            localStorage.clear();
            this.loggerService.isLoggedin = false;
          }
        }
      );






  }

  getOrderDetails(orderId:string){
      return this.http
        .get(this.url + '/order/'+ orderId)
        .subscribe(
          (response: any) => {
            this.orderData = response; // Assuming the API response is an array of cart items
            this.orderDataSubject.next(this.orderData); // Emit the updated cart data
          },
          (error) => {
            this.toastr.error(error.error.msg || error.error.error);
            if (error.status === 500 || error.status === 401) {
              localStorage.clear();
              this.loggerService.isLoggedin = false;
            }
          }
        );
  }


  placeOrder(form: any) {
    return this.http
      .post(this.url + '/order', form)
      .subscribe(
        (response: any) => {
          this.orderData = response; // Assuming the API response is an array of cart items
          this.orderDataSubject.next(this.orderData); // Emit the updated cart data
        },
        (error) => {
          this.toastr.error(error.error.msg || error.error.error);
          if (error.status === 500 || error.status === 401) {
            localStorage.clear();
            this.loggerService.isLoggedin = false;
          }
        }
      );
  }

  cancelItemFromOrder(orderId:string,productId:string){    
     return this.http
       .put(
         this.url + '/order/' + orderId,
         {productId},
       )
       .subscribe(
         (response: any) => {
            this.orderData = response; 
           this.orderDataSubject.next(this.orderData); // Emit the updated cart data
         },
         (error) => {
           this.toastr.error(error.error.msg || error.error.error);
           if (error.status === 500 || error.status === 401) {
             localStorage.clear();
             this.loggerService.isLoggedin = false;
           }
         }
       );
  }

  cancelOrder(orderId: string) {
    return this.http
      .put(this.url + '/order/cancel/' + orderId, {})
      .subscribe(
        (response: any) => {
            this.orderData = response; 
          this.orderDataSubject.next(this.orderData); // Emit the updated cart data
        },
        (error) => {
          this.toastr.error(error.error.msg || error.error.error);
          if (error.status === 500 || error.status === 401) {
            localStorage.clear();
            this.loggerService.isLoggedin = false;
          }
        }
      );
  }
}
