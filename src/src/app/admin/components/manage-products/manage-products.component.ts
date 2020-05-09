import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'shared/models/product/product.model';
import { ProductService } from 'shared/services/product/product.service';

@Component({
  selector: 'manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit{

  products: Product[] = new Array();
  filteredProducts: Product[] = new Array();
  products$: Observable<any>;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products$ = this.productService.getAll()
      .snapshotChanges()
      .pipe(
        map(product => {
          return product.map(p => (
            this.products.push(p.payload.val()),
            {
              key: p.payload.key,
              value: {
                title: p.payload.val().title,
                price: p.payload.val().price
              }
            }));
        })
      );

    this.filteredProducts = this.products;
  }

  filter(query: string) {
    this.filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : this.products;
    console.log(this.filteredProducts);
  }

  delete(key) {
    this.productService.delete(key);
  }
}
