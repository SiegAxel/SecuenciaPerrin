import { TestBed } from '@angular/core/testing';

import { ClaseStorageService } from './clase-storage.service';

describe('ClaseStorageService', () => {
  let service: ClaseStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClaseStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
