import { Component } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-trackorder',
  templateUrl: './trackorder.component.html',
  styleUrls: ['./trackorder.component.css']
})
export class TrackorderComponent {
  constructor(private orderService:OrderService){}
  order:any;
  submit(id:any){
    this.orderService.trackOrder(id).subscribe((res:any)=>{
      this.order=res.order
    })
  }
}
