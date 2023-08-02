import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductdetailComponent } from './components/products/productdetail/productdetail.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { authGuard } from './services/auth.guard';
import { OrdersComponent } from './components/orders/orders.component';
import { WrongurlComponent } from './components/errorpages/wrongurl/wrongurl.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: ProductdetailComponent },
  { path: 'cart', canActivate: [authGuard], component: CartComponent },
  { path: 'checkout', canActivate: [authGuard], component: CheckoutComponent },
  {
    path: 'orders',
    canActivate: [authGuard],
    component: OrdersComponent,
  },
  { path: '**', component: WrongurlComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
