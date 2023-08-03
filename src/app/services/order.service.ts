import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}
  url: string = environment.apiUrl;

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-api-key': localStorage.getItem('token') || '',
  });

  getUserOrder(){
    return this.http.get(this.url+'/order',{headers:this.headers})
  }


  placeOrder(form: any) {
    return this.http.post(this.url + '/order', form,{headers:this.headers})
  }
}
