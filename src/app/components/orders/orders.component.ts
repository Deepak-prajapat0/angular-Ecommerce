import { Component } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  constructor(private orderService:OrderService){}
  orderDetail:any

  ngOnInit(): void {
    this.orderService.getUserOrder().subscribe((res: any) => {
      console.log(res.order)
      this.orderDetail = res.order
    });
  }
}
