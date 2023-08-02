import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css'],
})
export class ProductdetailComponent {
  constructor(
    private router: ActivatedRoute,
    private productService: ProductService,
    private cartService:CartService
  ) {}

  product!: Product;
  image:string=''
  loading:boolean=false

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

  addToCart(id:string){
    this.loading=true
    this.cartService.addToCart(id).subscribe(res=>{
      console.log(res)
      this.loading =false
    });
  }
}
