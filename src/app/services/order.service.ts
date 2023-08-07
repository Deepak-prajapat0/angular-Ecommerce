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
  headers: any;
  constructor(private http: HttpClient,private toastr:ToastrService,private loggerService:LoggerService,private router:Router) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': localStorage.getItem('token') || '',
    });
  }

  private orderDataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    []
  );
  url: string = environment.apiUrl;
  orderData:any[]=[]

  getOrderData():Observable<any>{
    return this.orderDataSubject.asObservable()
  }

  getUserOrder(headers:any) {
    return this.http
      .get(this.url + '/order', { headers: headers })
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

  getOrderDetails(orderId:string,headers:any){
      return this.http
        .get(this.url + '/order/'+ orderId, { headers: headers })
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
      .post(this.url + '/order', form, { headers: this.headers })
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
    console.log(orderId,productId);
    
     return this.http
       .put(
         this.url + '/order/' + orderId,
         {productId},
         { headers: this.headers }
       )
       .subscribe(
         (response: any) => {
            this.orderData = response; 
            console.log(response);
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
      .put(this.url + '/order/cancel/' + orderId, {}, { headers: this.headers })
      .subscribe(
        (response: any) => {
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
