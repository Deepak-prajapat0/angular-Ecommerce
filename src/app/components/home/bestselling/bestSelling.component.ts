import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'bestselling',
  templateUrl: './bestSelling.component.html',
  styleUrls: ['./bestSelling.component.css'],
})
export class BestsellingComponent {
  constructor(private router:Router,private productService: ProductService) {}
  products: Product[] = [];

  ngOnInit() {
    this.productService.getLimitedProducts().subscribe((res) => {
      this.products = res.products;
    });
  }

  productDetails(id:string){
      this.router.navigateByUrl(`/product/${id}`)
  }
}
