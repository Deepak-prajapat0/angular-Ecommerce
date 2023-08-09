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
import { ForgotpasswordComponent } from './components/forms/forgotpassword/forgotpassword.component';
import { UpdatepasswordComponent } from './components/forms/updatepassword/updatepassword.component';
import { OrderDetailsComponent } from './components/order-details/orderDetails.component';
import { AboutComponent } from './components/about/about.component';
import { ContactusComponent } from './components/contactus/contactus.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  { path: 'updatepassword/:emailToken', component: UpdatepasswordComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:title', component: ProductdetailComponent },
  { path: 'cart', canActivate: [authGuard], component: CartComponent },
  { path: 'checkout', canActivate: [authGuard], component: CheckoutComponent },
  { path: 'order', canActivate: [authGuard],component: OrdersComponent },
  { path: 'order/:orderId', canActivate: [authGuard], component: OrderDetailsComponent},
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactusComponent },
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
