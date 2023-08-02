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
    private loggerService: LoggerService,
    private cartService:CartService,
    private toastr: ToastrService
  ) {}

  url: string = environment.apiUrl;
  count:number=0

  login(data: any) {
    return this.http.post(this.url + '/login', data).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/']);
        this.loggerService.isLoggedin = true;
        this.cartService.getUserCart().subscribe((res:any)=>{
          this.count = res.cart.totalItems
        })
        this.toastr.success(res.msg);
      },
      (err) => {
        this.toastr.error(err.error.msg);
      }
    );
  }
  signup(data: any) {
    return this.http
      .post(this.url + '/register', data)
      .subscribe((res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/']);
        this.loggerService.isLoggedin = true;
      },(err)=>{
        this.toastr.error(err.error.msg);
      });
  }
}
