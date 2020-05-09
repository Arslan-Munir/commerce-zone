import { Component, Input } from '@angular/core';
import { ShoppingCart } from 'shared/models/cart/shopping-cart.model';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent {

  @Input('cart') cart: ShoppingCart;

  constructor() { }

}
