import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { BestsellingComponent } from './components/home/bestselling/bestSelling.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductdetailComponent } from './components/products/productdetail/productdetail.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { OrdersComponent } from './components/orders/orders.component';
import { CartComponent } from './components/cart/cart.component';
import { WrongurlComponent } from './components/wrongurl/wrongurl.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ForgotpasswordComponent } from './components/forms/forgotpassword/forgotpassword.component';
import { UpdatepasswordComponent } from './components/forms/updatepassword/updatepassword.component';
import { OrderDetailsComponent } from './components/order-details/orderDetails.component';
import { TokenInterceptorService } from './JwtInterceptor';
import { AboutComponent } from './components/about/about.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { StripePayment } from './stripe/stripe.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    BestsellingComponent,
    FooterComponent,
    ProductsComponent,
    ProductdetailComponent,
    LoginComponent,
    SignupComponent,
    OrdersComponent,
    CartComponent,
    WrongurlComponent,
    CheckoutComponent,
    ForgotpasswordComponent,
    UpdatepasswordComponent,
    OrderDetailsComponent,
    AboutComponent,
    ContactusComponent,
    StripePayment
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1500,
      positionClass: 'toast-top-center',
      progressBar: true,
      closeButton: true,
      preventDuplicates: true,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
