import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ManageOrdersComponent } from 'app/admin/components/manage-orders/manage-orders.component';
import { ManageProductsComponent } from 'app/admin/components/manage-products/manage-products.component';
import { ProductComponent } from 'app/admin/components/product/product.component';
import { AdminAuthGuard } from 'app/admin/services/admin-auth-guard.service';
import { ProductCardComponent } from 'shared/components/product-card/product-card.component';
import { AuthGuard } from 'shared/services/gaurd/auth-guard.service';
import { SharedModule } from './shared.module';

@NgModule({
  declarations: [
    ManageOrdersComponent,
    ManageProductsComponent,
    ProductComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: 'admin/manage-orders',
        component: ManageOrdersComponent,
        canActivate: [AuthGuard, AdminAuthGuard],
      },
      {
        path: 'admin/manage-products',
        component: ManageProductsComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/manage-products/add',
        component: ProductComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/manage-products/:productId',
        component: ProductComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      }
    ])
  ],
  providers: [
    AdminAuthGuard
  ]
})
export class AdminModule { }
