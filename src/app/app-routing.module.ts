import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductdetailComponent } from './components/products/productdetail/productdetail.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { authGuard } from './services/auth.guard';
import { OrdersComponent } from './components/orders/orders.component';
import { WrongurlComponent } from './components/wrongurl/wrongurl.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ForgotpasswordComponent } from './components/passwordforms/forgotpassword/forgotpassword.component';
import { UpdatepasswordComponent } from './components/passwordforms/updatepassword/updatepassword.component';
import { OrderDetailsComponent } from './components/order-details/orderDetails.component';
import { AboutComponent } from './components/about/about.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { StripePayment } from './components/stripe/stripe.component';
import { PaymentsuccessComponent } from './components/partials/paymentsuccess/paymentsuccess.component';
import { PaymentfailedComponent } from './components/partials/paymentfailed/paymentfailed.component';
import { TrackorderComponent } from './components/trackorder/trackorder.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  { path: 'updatepassword/:emailToken', component: UpdatepasswordComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:title', component: ProductdetailComponent },
  { path: 'cart',  component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'order', canActivate: [authGuard],component: OrdersComponent },
  { path: 'track',component: TrackorderComponent },
  { path: 'order/:orderId', canActivate: [authGuard], component: OrderDetailsComponent},
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactusComponent },
  { path: 'stripe', component: StripePayment },
  { path: 'success', component: PaymentsuccessComponent },
  { path: 'failed', component: PaymentfailedComponent },
  { path: '**', component: WrongurlComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
