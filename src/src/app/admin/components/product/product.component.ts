import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { Product } from 'shared/models/product/product.model';
import { CategoryService } from 'shared/services/category/category.service';
import { ProductService } from 'shared/services/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product: Product;
  id: string;
  categories$;

  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private router: Router,
              private route: ActivatedRoute) {
    this.product = new Product();
  }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('productId');
    if (productId) {
      this.productService.getById(productId)
        .valueChanges()
        .pipe(take(1))
        .subscribe(product => {
          this.id = productId;
          this.product = product;
        });
    }

    this.categories$ = this.categoryService.getAll()
      .snapshotChanges()
      .pipe(
        map(category => {
          return category.map(c => ({
            key: c.payload.key,
            value: c.payload.val()
          }));
        })
      );
  }

  save() {
    if (!this.id) {
      this.productService.save(this.product);
    } else {
      this.productService.update(this.id, this.product);
    }

    this.router.navigateByUrl('/admin/manage-products');
  }

  delete() {
    if (!confirm('Are you sure you want to delete')) { return; }

    this.productService.delete(this.id);
    this.router.navigateByUrl('/admin/manage-products');
  }

  clear() {
      this.product.title = '';
      this.product.price = null;
      this.product.category = null;
      this.product.imageUrl = '';
  }
}
