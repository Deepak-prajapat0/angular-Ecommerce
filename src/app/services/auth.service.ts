import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private http: HttpClient) {}

  isLoggedin!: boolean ;
  msg!:any
  isLoggedIn() {
    return this.isLoggedin;
  }

  url: string = 'http://192.168.1.39:3000';

  login(data: any) {
    return this.http.post(this.url + '/login', data).subscribe((res: any) => {

        localStorage.setItem('token', res.token);
        this.router.navigate(['/']);
        this.isLoggedin = true;
      
    },error=>{
      return this.msg = error.error.msg
    });
  }
  signup(data: any) {
    return this.http
      .post(this.url + '/register', data)
      .subscribe((res: any) => {
        if (res.status == false) {
          alert(res.msg);
        } else {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/']);
          this.isLoggedin = true;
        }
      });
  }
}
