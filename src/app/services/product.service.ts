import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { environment } from '../environment/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  url: string = environment.API_URL;
  private productSubject: BehaviorSubject<Product> = new BehaviorSubject<Product>(<any>[]);

  getProduct(): Observable<any> {
    return this.productSubject.asObservable();
  }

  getAllProducts(): Observable<any> {
    return this.http.get(`${this.url}/products`);
  }

  getFilteredProducts(query: string): Observable<any> {
    return this.http.get(`${this.url}/products/search/${query}`);
  }
  getLimitedProducts(): Observable<any> {
    return this.http.get(`${this.url}/best-products`);
  }
  getProductById(title: string){
    this.http.get(`${this.url}/products/${title}`).subscribe((res:any)=>{     
      return this.productSubject.next(res)
    })
  }
  getSearchProducts(title: string) {
    return this.http.get(`${this.url}/products/search?q=${title}`).pipe(
      debounceTime(1000),
      distinctUntilChanged(),
    )
  }
}
