import { TestBed } from '@angular/core/testing';

import { TableApiService } from './table-api.service';

describe('TableApiService', () => {
  let service: TableApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
