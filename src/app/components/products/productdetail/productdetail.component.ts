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
    private Arouter: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private toastr: ToastrService
    ) {}
    product!: Product;
    image: string = '';
    loading: boolean = false;
    token: string = '';
    
    changeImg(img: string) {
      this.image = img;
    }
  ngOnInit(): void {
    this.token = localStorage.getItem('token') || '';
    let paramId = this.Arouter.snapshot.paramMap.get('title');
    if (paramId) {
      this.loading = true;
      this.productService.getProductById(paramId).subscribe((res) => {
        this.product = res.product;
        this.loading = false;
      });
    }
  }


  addToCart(id: string) {
    if (this.token) {
      this.loading = true;
      this.cartService.addToCart(id);
      this.cartService.getCartData().subscribe((res) => {
        setTimeout(() => {
          this.loading = false;
        }, 2000);
      });
    } else {
      this.toastr.warning('please login first');
    }
  }
}
