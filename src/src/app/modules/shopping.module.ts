import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CheckOutComponent } from 'app/shopping/components/check-out/check-out.component';
import { MyOrdersComponent } from 'app/shopping/components/my-orders/my-orders.component';
import { OrderSuccessComponent } from 'app/shopping/components/order-success/order-success.component';
import { ProductFilterComponent } from 'app/shopping/components/products/product-filter/product-filter.component';
import { ProductsComponent } from 'app/shopping/components/products/products.component';
import { ShippingFormComponent } from 'app/shopping/components/shipping-form/shipping-form.component';
import { ShoppingCartSummaryComponent } from 'app/shopping/components/shopping-cart-summary/shopping-cart-summary.component';
import { ShoppingCartComponent } from 'app/shopping/components/shopping-cart/shopping-cart.component';
import { AuthGuard } from 'shared/services/gaurd/auth-guard.service';
import { SharedModule } from './shared.module';

@NgModule({
  declarations: [
    ShoppingCartComponent,
    MyOrdersComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    ProductsComponent,
    ProductFilterComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'products', component: ProductsComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },

      {
        path: 'check-out',
        component: CheckOutComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'order-success/:orderId',
        component: OrderSuccessComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'my-orders',
        component: MyOrdersComponent,
        canActivate: [AuthGuard],
      }
    ])
  ],
  exports: [
    ProductsComponent,
    ShoppingCartComponent
  ]
})
export class ShoppingModule { }
