import { Component } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent {
  constructor(private wishlistService: WishlistService,private cartService:CartService) {}
  wishlistProducts: Product[] = [];
  loading: boolean = false;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loading = true;
    this.wishlistService.getWishlist().subscribe((res: any) => {
      this.wishlistProducts = res.wishlist.products;
      this.loading = false;
    });
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }
  addToCart(product:any){
    this.cartService.addToCart(product)
    this.removeFromWishlist(product._id)
  }

  removeFromWishlist(productId:string){
    this.wishlistService.removeFromWishlist(productId).subscribe(res=>{
     this.wishlistProducts = res.wishlist.products
    })
  }
}
