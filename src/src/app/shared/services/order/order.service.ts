import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { CartService } from 'shared/services/cart/cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private cartService: CartService) { }

  async getAll() {
    return await this.db.list('orders').valueChanges();
  }

  getUserOrders(userId: string) {
    return this.db.list('orders', ref => ref.orderByChild('userId').equalTo(userId)).valueChanges();
  }

  async placeOrder(order) {
    const result = await this.db.list('/orders').push(order);
    await this.cartService.clearCart();
    return result;
  }
}
