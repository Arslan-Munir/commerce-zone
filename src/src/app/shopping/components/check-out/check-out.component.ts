import { Component, OnInit } from '@angular/core';
import { CartService } from 'shared/services/cart/cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/cart/shopping-cart.model';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  cart$: Observable<ShoppingCart>;

  constructor(private cartService: CartService) { }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
  }
}

