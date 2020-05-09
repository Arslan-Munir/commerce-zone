import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { GoogleAuthService } from 'shared/services/auth/google/google-auth.service';
import { OrderService } from 'shared/services/order/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit, OnDestroy {

  orders$;
  subscription: Subscription;

  constructor(private authService: GoogleAuthService, private orderService: OrderService) { }

  async ngOnInit() {
    this.subscription = this.authService.appUser$.pipe(
      map(appUser => appUser.uid)
    ).subscribe(x => {
      this.orders$ = this.orderService.getUserOrders(x);
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
