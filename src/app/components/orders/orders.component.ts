import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent {
  constructor(
    private orderService: OrderService,
    private toastr: ToastrService
  ) {}
  loading: boolean = false;
  orders: any;

  getTime(input: string) {
    return new Date(input).toLocaleDateString();
  }
  ngOnInit(): void {
    this.loading = true
    this.orderService.getUserOrder();
    this.orderService.getOrderData().subscribe((data: any) => {
      if (data.order) {
        this.orders = data.order;
        this.loading = false
      }
    });
  }

  orderCancel(id: string) {
    this.loading = true
    this.orderService.cancelOrder(id);
    this.orderService.getOrderData().subscribe((data: any) => {
      if (data) {
        this.orders = this.orders.filter((x: any) => x._id != id);
        this.toastr.success(data.msg);
        this.loading = false
      }
    });
  }
}
