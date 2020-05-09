import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ShoppingCart } from 'shared/models/cart/shopping-cart.model';
import { ViewProduct } from 'shared/models/product/view-product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private db: AngularFireDatabase) {
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCart();
    return this.db.object<ShoppingCart>('/shopping-carts/' + cartId)
      .valueChanges()
      .pipe(map(x => new ShoppingCart(x.items)));
  }

  async addToCart(product: ViewProduct) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: ViewProduct) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    const cartId = await this.getOrCreateCart();
    this.db.object('/shopping-carts/' + cartId + '/items/').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCart(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (!cartId) {
      const result = this.create();
      localStorage.setItem('cartId', result.key);
      return result.key;
    }
    return cartId;
  }

  private async updateItem(product: ViewProduct, change: number) {
    const cartId = await this.getOrCreateCart();
    const item$ = this.getItem(cartId, product.id);

    item$.valueChanges()
      .pipe(take(1))
      .subscribe((item: any) => {
        const quantity = (item ? item.quantity : 0) + change;
        if (quantity === 0) { item$.remove(); }
        else {
          item$.update({
            title: product.title,
            imageUrl: product.imageUrl,
            price: product.price,
            quantity
          });
        }
      });
  }
}
