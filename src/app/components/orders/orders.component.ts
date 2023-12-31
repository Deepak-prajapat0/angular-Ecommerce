import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent {
  constructor(private orderService: OrderService) {}
  loading: boolean = false;
  orders: Order[]=[];

  getTime(input: string) {
    return new Date(input).toLocaleDateString();
  }
  ngOnInit() {
    this.loading = true;
    this.orderService.getUserOrder().subscribe((response:any) => {
      this.loading = false;
      this.orders = response.order;
    });
  }
}
