import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from 'shared/models/product/product.model';
import { ViewProduct } from 'shared/models/product/view-product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  save(product: Product) {
      this.db.list('/products').push(product);
  }

  getById(productId: string) {
    return this.db.object<Product>('/products/' + productId);
  }

  getByCategory(category: string) {
    return this.db.list<ViewProduct>('products', ref => ref.equalTo(category, 'category'));
  }

  getAll() {
    return this.db.list<ViewProduct>('products');
  }

  update(id, product: Product) {
      this.db.object('/products/' + id).update(product);
  }
  delete(id) {
    this.db.object('/products/' + id).remove();
  }
}
