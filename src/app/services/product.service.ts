import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  url: string = 'http://192.168.1.39:3000';

  getAllProducts(): Observable<any> {
    return this.http.get(this.url+'/products');
  }
  getLimitedProducts(): Observable<any> {
    return this.http.get(this.url + '/best-products');
  }
  getProductById(id: string): Observable<any> {
    return this.http.get(this.url + `/products/${id}`);
  }
}
