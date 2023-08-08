import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { LoggerService } from './logger.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../environment/environment';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private http: HttpClient,
    private cartService:CartService,
    private loggerService: LoggerService,
    private toastr: ToastrService
  ) {}

  url: string = environment.apiUrl;
  count: number = 0;

  login(data: any) {
    return this.http.post(this.url + '/login', data).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/']);
        this.cartService.getUserCart()
        this.loggerService.isLoggedin = true;
        this.toastr.success(res.msg);
      },
      (err) => {
        this.toastr.error(err.error.msg);
      }
    );
  }
  signup(data: any) {
    return this.http.post(this.url + '/register', data).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/']);
        this.loggerService.isLoggedin = true;
        this.toastr.success(res.msg);
      },
      (err) => {
        this.toastr.error(err.error.msg);
      }
    );
  }

  logout() {
    localStorage.clear();
    this.loggerService.isLoggedin = false;
    this.router.navigate(['/login']);
  }

  forgotPassword(email: any) {
    return this.http.post(this.url + '/forgetpassword', { email: email });
  }

  updatePassword(form: any, emailToken: string) {
    return this.http
      .put(this.url + '/updatepassword/' + emailToken, form)
      .subscribe((res:any) => {
        this.toastr.success(res.msg)
        this.router.navigate(['/login'])
      },
        (err) => {
        this.toastr.error(err.error.msg);
      });
  }
}

