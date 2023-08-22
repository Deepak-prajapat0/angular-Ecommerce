import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { environment } from '../environment/environment';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  url: string = environment.API_URL;

  getAllProducts(): Observable<any> {
    return this.http.get(`${this.url}/products`);
  }

  getFilteredProducts(query: string): Observable<any> {
    return this.http.get(`${this.url}/products/search/${query}`);
  }
  getLimitedProducts(): Observable<any> {
    return this.http.get(`${this.url}/best-products`);
  }
  getProductById(title: string): Observable<any> {
    return this.http.get(`${this.url}/products/${title}`);
  }
  getSearchProducts(title: string): Observable<any> {
    return this.http.get(`${this.url}/products/search?q=${title}`);
  }
}
