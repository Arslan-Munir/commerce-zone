import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShoppingCart } from 'shared/models/cart/shopping-cart.model';
import { Order } from 'shared/models/ordering/order.model';
import { Shipping } from 'shared/models/ordering/shipping.model';
import { GoogleAuthService } from 'shared/services/auth/google/google-auth.service';
import { OrderService } from 'shared/services/order/order.service';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {

  @Input('cart') cart: ShoppingCart;
  shipping = new Shipping();
  userId: string;
  userSubscription: Subscription;

  constructor(private authService: GoogleAuthService,
              private orderService: OrderService,
              private router: Router) { }

  async ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    const order = new Order(this.userId, this.shipping, this.cart);
    const result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }
}
