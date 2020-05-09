import { Component, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { CategoryService } from 'shared/services/category/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {

  categories$;
  @Input('category') category;
  @Input('show-all-category-text') showAllCategoryText;

  constructor(categoryService: CategoryService) {
    this.categories$ = categoryService.getAll()
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

}
