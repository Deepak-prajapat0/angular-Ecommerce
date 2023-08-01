import { Component } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  constructor(private productService: ProductService) {}
  products: Product[] = [];

  ngOnInit() {
    this.productService.getAllProducts().subscribe((res) => {
      this.products = res.products;
    });
  }
}
