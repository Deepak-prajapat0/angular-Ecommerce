import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  url: string = environment.API_URL;
  constructor(private http: HttpClient) {}
  payment(order: any, form: any): Observable<any> {
    return this.http.post(`${this.url}/payment`, { cart: order, form });
  }
}
