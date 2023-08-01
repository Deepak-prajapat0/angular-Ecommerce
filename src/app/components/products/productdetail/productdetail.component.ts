import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css'],
})
export class ProductdetailComponent {
  constructor(
    private router: ActivatedRoute,
    private productService: ProductService
  ) {}

  product!: Product;
  image:string=''

  ngOnInit(): void {
    let paramId = this.router.snapshot.paramMap.get('id');
    if (paramId) {
      this.productService.getProductById(paramId).subscribe((res) => {
        this.product = res.product;
      });
    }
  }

  changeImg(img:string){
      this.image = img
  }
}
