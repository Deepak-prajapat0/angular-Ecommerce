import { HttpHeaders } from '@angular/common/http';
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
  headers:any

  getTime(input: string) {
    return new Date(input).toLocaleDateString();
  }
  ngOnInit(): void {
    this.loading = true
      this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'x-api-key': localStorage.getItem('token') || '',
      });
    this.orderService.getUserOrder(this.headers);
    this.orderService.getOrderData().subscribe((data: any) => {
      if (data) {
        this.orders = data.order;
        this.loading = false
      }
    });
  }

}
