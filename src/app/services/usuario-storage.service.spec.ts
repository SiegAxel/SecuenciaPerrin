import { TestBed } from '@angular/core/testing';

import { UsuarioStorageService } from './usuario-storage.service';

describe('UsuarioStorageService', () => {
  let service: UsuarioStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
