import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private router: Router, private http: HttpClient) {}
  url: string = environment.apiUrl;

  //  headers = new Headers().append('Content-Type', 'application/json');

  // headers.append('authentication', `${student.token}`);

  // let options = new RequestOptions({ headers: headers });
  // return this.http
  //     .put(url, JSON.stringify(student), options)

  // headers: HttpHeaders = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   'x-api-key': localStorage.getItem('token') || '',
  // });
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-api-key': localStorage.getItem('token') || '',
  });
  getUserCart() {
    // console.log(this.headers);
    return this.http.get(this.url + '/cart', {
      headers: this.headers,
    })
  }
  addToCart(id: string) {
    // console.log(this.headers);
    return this.http.post(
      this.url + '/cart',
      { id: id },
      {
        headers: this.headers,
      }
    );
  }
  cartUpdate(productId:string,quantity:number){
    return this.http.put(this.url+'/cart',{productId,quantity},{headers:this.headers})
  }
}
