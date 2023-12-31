import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { debounce, debounceTime, distinctUntilChanged } from 'rxjs';
import { Cart } from 'src/app/models/cart.model';
import { Product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { LoggerService } from 'src/app/services/logger.service';
import { ProductService } from 'src/app/services/product.service';

const routerLinks = [
  { name: 'Home', link: '/' },
  { name: 'Products', link: '/products' },
  // { name: 'Track order', link: '/track' },
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
  constructor(
    private router: Router,
    private loggerService: LoggerService,
    private authService: AuthService,
    private cartService: CartService,
    private productService:ProductService
  ) {}
  loggedIn: boolean = false;
  count: number = 0;
  open: boolean = false;
  searchResult: any | undefined;

  ngOnInit() {
    let cart = localStorage.getItem('cart');

    if (cart) {
      this.count = JSON.parse(cart).totalItems;
      this.cartService.getCartData().subscribe((data: Cart) => {
        if (data) {
          if(data.totalItems>0){
            this.count = data.totalItems;
          }
          else{
            this.count=0
          }
        }
        
      });
    } else {
      this.count = 0;
      this.cartService.getCartData().subscribe((data: Cart) => {
        if (data.totalItems >0) {
          this.count = data.totalItems;
        } 
      });
    }
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('token')) {
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
    this.count = 0;
    this.authService.logout();
  }

  show() {
    this.open = true;
  }
  hide() {
    this.open = false;
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
       if(element.value.length){
         this.productService
           .getSearchProducts(element.value)
           .pipe(debounceTime(1000), distinctUntilChanged())
           .subscribe((res) => {
             this.searchResult = res;
           });
       }
    }
  }

  search(query:String){
    if(query.length){
      this.router.navigate([`/products/search/${query}`]);
    }
  }
  hideSearch() {
    this.searchResult = undefined;
  }
  redirectToDetails(title: string) {
    this.router.navigate(['/products/' + title]);
  }
}
