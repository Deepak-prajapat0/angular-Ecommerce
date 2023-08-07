import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private cartService:CartService,
  ) {}
  headers:any
  product!: Product;
  image:string=''
  loading:boolean=false
  


  ngOnInit(): void {
    let paramId = this.router.snapshot.paramMap.get('id');
        this.headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'x-api-key': localStorage.getItem('token') || '',
        });
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
    this.cartService.addToCart(this.headers,id)
     this.cartService.getCartData().subscribe(res=>{

       setTimeout(() => {
         this.loading=false
        }, 2000);
     })
  }
}
