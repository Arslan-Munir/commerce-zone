import { Component, Input } from '@angular/core';
import { CartService } from 'shared/services/cart/cart.service';
import { ShoppingCart } from 'app/shared/models/cart/shopping-cart.model';
import { ViewProduct } from 'shared/models/product/view-product.model';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input('product') product: ViewProduct;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(public cart: CartService) {}

  addToCart() {
    this.cart.addToCart(this.product);
  }
}
