import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  url: string = 'https://dummyjson.com/products';

  getAllProducts(): Observable<any> {
    return this.http.get(this.url);
  }
  getLimitedProducts(): Observable<any> {
    return this.http.get(this.url + '/?limit=20');
  }
}
