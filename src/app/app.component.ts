import { Component } from '@angular/core';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls:['./app.component.css']
})
export class AppComponent {
  title = 'angular-Ecommerce-task';

  loading = false;
  constructor(private router: Router) {
     this.router.events.subscribe((event: Event) => {
       switch (true) {
         case event instanceof NavigationStart: {
           this.loading = true;
           break;
         }

         case event instanceof NavigationEnd:
         case event instanceof NavigationCancel:
         case event instanceof NavigationError: {
           this.loading = false;
           break;
         }
         default: {
           break;
         }
       }
     });
  }


  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
