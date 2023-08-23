import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css'],
})
export class ProductdetailComponent {
  constructor(
    private Arouter: ActivatedRoute,
    private productService: ProductService,
    private wishlistService: WishlistService,
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
      // this.loading = true;
      const title = params['title'];
      this.productService.getProductById(title).subscribe((res:any) => {
        this.product = res.product;
        // this.loading = false;
      });
    });
    this.cdr.detectChanges();
  }

  addToCart(id: any) {
    this.loading=true;
    console.log(this.loading);
    this.cartService.addToCart(id);
    this.cartService.getCartData().subscribe();    
  setTimeout(() => {
   this.loading = false;
  }, 2000);
  }

  wishlistProduct(productId:string){
    if(this.token){
     this.loading = true
     this.wishlistService.addToWishlist(productId).subscribe((res) => {
      this.toastr.success(res.msg)
     });
      setTimeout(() => {
        this.loading = false;
      }, 2000);
   }
   else{
    this.toastr.warning("Please login to add in wishlist")
   }
  }
}
