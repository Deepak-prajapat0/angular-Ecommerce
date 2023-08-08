import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './orderDetails.component.html',
  styleUrls:['./orderDetails.component.css']
})
export class OrderDetailsComponent {
  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private orderService: OrderService,
    private toastr: ToastrService
  ) {}
  loading: boolean = false;
  orderDetail: any;
  orderId: any;

  ngOnInit(): void {
    this.orderId = this.router.snapshot.paramMap.get('orderId');
   
    if (this.orderId) {
      this.orderService.getOrderDetails(this.orderId);
      this.orderService.getOrderData().subscribe((data: any) => {
        if (data) {
          this.orderDetail = data.order;
          this.loading = false;
        } 
      });
    }
  }

  cancelItem(id: string) {
    this.loading = true
    this.orderService.cancelItemFromOrder(this.orderId, id);
    this.orderService.getOrderData().subscribe((data: any) => {
      if (data) {
        this.orderDetail = data.order;
        this.loading = false;

      }
    });
  }

  orderCancel(id: string) {
    this.loading = true;
    this.orderService.cancelOrder(id);
    this.orderService.getOrderData().subscribe((data: any) => {
     if (data) {
       this.orderDetail = data.order;
       this.loading = false;
     } 
    });
  }
}
