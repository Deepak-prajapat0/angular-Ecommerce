import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrls: ['./updatepassword.component.css'],
})
export class UpdatepasswordComponent {
  constructor(private authService: AuthService,private router:ActivatedRoute) {}

  form = new FormGroup({
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  get password() {
    return this.form.get('password');
  }
  get confirmPassword() {
    return this.form.get('confirmPassword');
  }
  onSubmit() {
    if(this.password?.value !== this.confirmPassword?.value){
      this.form.setErrors({notMatch:"Both password should match"})
    }
    else{
          let emailToken = this.router.snapshot.paramMap.get('emailToken');
          if(emailToken){
            this.authService.updatePassword(this.form.value, emailToken)
          }
      
    }

  }
}
