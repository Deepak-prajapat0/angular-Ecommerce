import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './orderDetails.component.html',
  styleUrls:['./orderDetails.component.css']
})
export class OrderDetailsComponent {
  constructor(
    private Arouter: ActivatedRoute,
    private orderService: OrderService,
    private toastr: ToastrService
  ) {}
  loading: boolean = false;
  notFound:boolean = false;
  orderDetail: any;
  orderId: any;

  ngOnInit(): void {
    this.orderId = this.Arouter.snapshot.paramMap.get('orderId');
    if (this.orderId) {
      this.loading = true
      this.orderService.getOrderDetails(this.orderId).subscribe((data: any) => {
        if (data) {
          this.orderDetail = data.order;
          this.loading = false;
          this.notFound =true
        } 
      });
    }
  }

  cancelItem(id: string) {
    this.loading = true
    this.orderService.cancelItemFromOrder(this.orderId, id).subscribe((data: any) => {
        if (data) {
          this.orderDetail = data.order;
          this.toastr.success(data.msg);
          this.loading = false;
          this.notFound = true;
          
        }
      });
  }

  orderCancel(id: string) {
    this.loading = true;
    this.orderService.cancelOrder(id).subscribe((data: any) => {
      if (data) {
        this.orderDetail = data.order;
         this.toastr.success(data.msg);
        this.loading = false;
        this.notFound = true;
      }
    });
  }
}
