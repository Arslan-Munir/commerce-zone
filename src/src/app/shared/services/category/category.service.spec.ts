import { TestBed } from '@angular/core/testing';

import { CategoryService } from 'shared/services/category/category.service';

describe('CateogryService', () => {
  let service: CategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
