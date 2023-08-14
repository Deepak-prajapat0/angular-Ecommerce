import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  url: string = environment.API_URL;
  constructor(private http: HttpClient) {}
  payment(order:any) {
    return this.http.post(this.url+'/payment',{items:order});
  }
}
