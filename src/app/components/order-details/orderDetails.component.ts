import { LoggerService } from 'src/app/services/logger.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order.model';

@Component({
  selector: 'app-order-details',
  templateUrl: './orderDetails.component.html',
  styleUrls:['./orderDetails.component.css']
})
export class OrderDetailsComponent {
  constructor(
    private Arouter: ActivatedRoute,
    private orderService: OrderService,
    private toastr: ToastrService,
    private router:Router,
    private loggerService:LoggerService
  ) {}
  loading: boolean = false;
  notFound:boolean = false;
  orderDetail!: Order;
  orderId: string | any;
  isLoggedIn:boolean = false;

  ngOnInit(): void {
    this.isLoggedIn = this.loggerService.isLoggedin;
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
          if(data.order.status === "canceled"){
            this.router.navigateByUrl('/order')
          }
          this.orderDetail = data.order;
          this.toastr.success(data.msg);
          this.loading = false;
          this.notFound = true;
        }
      });
        setTimeout(() => {
          this.loading = false;
        }, 2000);
  }

  orderCancel(id: string) {
    this.loading = true;
    this.orderService.cancelOrder(id).subscribe((data: any) => {
      if (data) {
         if (data.order.status === 'canceled') {
           this.router.navigateByUrl('/order');
         }
        this.orderDetail = data.order;
        this.toastr.success(data.msg);
        this.loading = false;
        this.notFound = true;
      }
    });
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }
}
