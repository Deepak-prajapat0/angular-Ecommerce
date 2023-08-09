import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css'],
})
export class ForgotpasswordComponent {
  constructor(private authService: AuthService , private toastr:ToastrService) {}

  linkSent:boolean=false
  loading:boolean = false

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  get email() {
    return this.form.get('email');
  }
  onSubmit() {
    this.loading=true
    this.authService.forgotPassword(this.email?.value).subscribe(
      (res: any) => {
        if (!res) {
          this.toastr.error('We are unable to send link on your email');
        }
        this.toastr.success(res.msg);
        this.linkSent=true
        this.loading=false
      },
      (err) => {
        this.loading = false;
      }
    );
  }
}
