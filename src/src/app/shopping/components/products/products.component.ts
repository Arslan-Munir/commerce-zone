import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ShoppingCart } from 'shared/models/cart/shopping-cart.model';
import { ViewProduct } from 'shared/models/product/view-product.model';
import { CartService } from 'shared/services/cart/cart.service';
import { ProductService } from 'shared/services/product/product.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: ViewProduct[] = [];
  filteredProducts: ViewProduct[] = [];
  subscription: Subscription;
  categoryParam;
  cart$: Observable<ShoppingCart>;
  cartSubscription: Subscription;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private cartService: CartService) { }

  async ngOnInit() {
    this.populateProducts();
    this.cart$ = await this.cartService.getCart();
  }

  private populateProducts() {
    this.subscription = this.productService
      .getAll()
      .snapshotChanges()
      .pipe(
        map(product => {
          return product.map(p => (
            {
              key: p.payload.key,
              value: p.payload.val()
            }
          ));
        }))
      .subscribe(p => {
        this.products = this.mapProduct(p);
        this.route.queryParamMap.subscribe(category => {
          this.categoryParam = category.get('category');
          this.applyFilter();
        });
      });
  }

  private applyFilter() {
    this.filteredProducts = (this.categoryParam) ? this.products.filter(pro => pro.category === this.categoryParam) : this.products;
  }

  private mapProduct(products): ViewProduct[] {
    const array: ViewProduct[] = [];

    for (const p of products) {
        const product = new ViewProduct();
        product.id = p.key;
        product.imageUrl = p.value.imageUrl;
        product.title = p.value.title;
        product.price = p.value.price;
        product.category = p.value.category;
        array.push(product);
      }

    return array;
  }

}
