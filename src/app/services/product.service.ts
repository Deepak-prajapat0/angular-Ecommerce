import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  url: string = environment.apiUrl;

  getAllProducts(): Observable<any> {
    return this.http.get(this.url + '/products');
  }
  getLimitedProducts(): Observable<any> {
    return this.http.get(this.url + '/best-products');
  }
  getProductById(id: string): Observable<any> {
    return this.http.get(this.url + `/products/${id}`);
  }
}
