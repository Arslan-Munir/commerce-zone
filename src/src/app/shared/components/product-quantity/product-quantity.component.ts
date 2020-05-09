import { Component, Input } from '@angular/core';
import { CartService } from 'shared/services/cart/cart.service';
import { ViewProduct } from 'shared/models/product/view-product.model';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
  @Input('product') product: ViewProduct;
  @Input('shopping-cart') shoppingCart;

  constructor(public cart: CartService) { }

  addToCart() {
    this.cart.addToCart(this.product);
  }

  removeFromCart() {
    this.cart.removeFromCart(this.product);
  }
}
