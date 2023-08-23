import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor(private http: HttpClient) {}
  url:string = environment.API_URL;

  addToWishlist(productId:string):Observable<any>{
    return this.http.post(`${this.url}/wishlist`,{productId});
  }
  getWishlist():Observable<any>{
    return this.http.get(`${this.url}/wishlist`);
  }
  removeFromWishlist(productId:string):Observable<any>{
    return this.http.put(`${this.url}/wishlist`,{productId})
  }
}
