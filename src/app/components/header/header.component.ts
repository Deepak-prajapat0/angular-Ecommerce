import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { LoggerService } from 'src/app/services/logger.service';

const routerLinks = [
  { name: 'Home', link: '/' },
  { name: 'Products', link: '/products' },
  { name: 'About', link: '/about' },
  { name: 'Contact-us', link: '/contact' },
];



@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  links: any[] = routerLinks;
  constructor(private router: Router, private loggerService: LoggerService,private authService:AuthService) {

  }
  loggedIn: boolean = false;
  count:number=0


  ngOnInit() {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('token')) {
                this.count = this.authService.count;
                console.log(this.authService.count);
          this.loggerService.isLoggedin = true;
          this.loggedIn = this.loggerService.isLoggedin;
        } else {
          this.loggerService.isLoggedin = false;
          this.loggedIn = this.loggerService.isLoggedin;
        }
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.loggerService.isLoggedin = false;
    this.loggedIn = this.loggerService.isLoggedin;
    this.router.navigate(['/login']);
  }
}
