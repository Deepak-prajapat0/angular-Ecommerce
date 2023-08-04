import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'angular-Ecommerce-task';
  constructor(private router: Router, private cartService:CartService) {}
  

  ngOnInit() {
   
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
