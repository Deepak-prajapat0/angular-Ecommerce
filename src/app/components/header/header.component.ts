import { Component } from '@angular/core';

const routerLinks = [
  { name: 'Home', link: '/' },
  { name: 'Products', link: '/products' },
  { name: 'About', link: '/about' },
  { name: 'Contact-us', link: '/contact' },
];



@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  links:any[] = routerLinks

}
