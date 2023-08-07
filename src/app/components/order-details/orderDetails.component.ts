import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './orderDetails.component.html',
})
export class OrderDetailsComponent {
  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private orderService: OrderService,
    private toastr: ToastrService
  ) {}
  headers: any;
  loading: boolean = false;
  orderDetail: any;
  orderId: any;

  ngOnInit(): void {
    this.orderId = this.router.snapshot.paramMap.get('orderId');
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': localStorage.getItem('token') || '',
    });
    if (this.orderId) {
      //  getting user order by orderId
      // this.loading = true;
      this.orderService.getOrderDetails(this.orderId,this.headers);
      this.orderService.getOrderData().subscribe((data: any) => {
        if (data.order) {
          this.orderDetail = data.order;
          // this.loading = false;
        } 
        // if (data.status == false) {
        //   this.route.navigate(['/']);
        // }
      });
    }
  }

  cancelItem(id: string) {
    // console.log(id)
    this.loading = true
    this.orderService.cancelItemFromOrder(this.orderId, id);
    this.orderService.getOrderData().subscribe((data: any) => {
      if (data.order) {
        this.orderDetail = data.order;
        this.loading = false;
      }
      //  if (data.status == false) {
      //    this.route.navigate(['/']);
      //  }
    });
  }

  orderCancel(id: string) {
    this.loading = true;
    this.orderService.cancelOrder(id);
    this.orderService.getOrderData().subscribe((data: any) => {
      if (data.order) {
        this.orderDetail = data.order;
        this.toastr.success(data.msg);
        this.loading = false;
         this.route.navigate(['/']);
      } 
      //  if (data.status == false) {
      //    this.route.navigate(['/']);
      //  }
    });
  }
}
