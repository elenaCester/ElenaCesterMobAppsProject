import { TestBed } from '@angular/core/testing';

import { SpoonacularApi } from './spoonacular-api';

describe('SpoonacularApi', () => {
  let service: SpoonacularApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpoonacularApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
