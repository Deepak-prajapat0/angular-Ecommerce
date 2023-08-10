import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService,private toastr:ToastrService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token  = localStorage.getItem('token');
    if (token) {
      request = request.clone({
        setHeaders: {
          "x-api-key": `${token}`,
        },
      });
    }
    return next.handle(request).pipe(
      catchError((err) => {
        console.log(err);
        if(err.status === 500){
          this.authService.logout();
        }
        if (err.status === 401 || err.status === 409) {
          this.toastr.error(err.error.msg);
          this.authService.logout();
        } else if (err.status === 404 || err.status === 400) {
          this.toastr.error(err.error.msg);
        }
        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
