import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-trackorder',
  templateUrl: './trackorder.component.html',
  styleUrls: ['./trackorder.component.css']
})
export class TrackorderComponent {
  constructor(private orderService:OrderService,private toastr:ToastrService){}
  order:any;
  submit(id:any,email:string){
   if (id === '' || id.length !== 24) {
    this.toastr.warning('Please enter valid orderId');
   } else if (email.length < 6) {
     this.toastr.warning('Please enter valid email');
   } else {
     this.orderService.trackOrder(id, email).subscribe((res: any) => {
       this.order = res.order;
     });
   }
  }
}
