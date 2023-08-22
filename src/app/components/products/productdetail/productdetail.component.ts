import { ChangeDetectorRef, Component } from '@angular/core';
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
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
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
    this.Arouter.params.subscribe((params) => {
      this.image=''
      this.loading = true;
      const title = params['title'];
      this.productService.getProductById(title).subscribe((res:any) => {
        this.product = res.product;
        this.loading = false;
      });
    });
    this.cdr.detectChanges();
  }

  addToCart(id: any) {
    this.cartService.addToCart(id);
    this.cartService.getCartData().subscribe((res) => {
    });
  }
}
