import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductCardComponent } from 'shared/components/product-card/product-card.component';
import { ProductQuantityComponent } from 'shared/components/product-quantity/product-quantity.component';
import { GoogleAuthService } from 'shared/services/auth/google/google-auth.service';
import { CartService } from 'shared/services/cart/cart.service';
import { CategoryService } from 'shared/services/category/category.service';
import { AuthGuard } from 'shared/services/gaurd/auth-guard.service';
import { OrderService } from 'shared/services/order/order.service';
import { ProductService } from 'shared/services/product/product.service';
import { UserService } from 'shared/services/user/user.service';

@NgModule({
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    NgbModule,
    MatIconModule,
    ProductCardComponent,
    ProductQuantityComponent,
  ],
  providers: [
    AuthGuard,
    GoogleAuthService,
    UserService,
    ProductService,
    CategoryService,
    CartService,
    OrderService
  ]
})
export class SharedModule { }
