import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-searchproduct',
  templateUrl: './searchproduct.component.html',
  styleUrls: ['./searchproduct.component.css']
})
export class SearchproductComponent {
  constructor(private Arouter:ActivatedRoute,private productService:ProductService,private cdr:ChangeDetectorRef){}
  products:Product[]=[]
  loading:boolean =false
  ngOnInit(): void {
     this.Arouter.params.subscribe((params:any) => {
       const query = params['query'];
       this.loading=true
       this.productService.getSearchProducts(query).subscribe((res: any) => {
         this.products = res;
         this.loading=false
       });
     });
     this.cdr.detectChanges();
    
  }
}
