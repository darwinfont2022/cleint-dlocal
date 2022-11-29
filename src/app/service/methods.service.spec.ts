import { TestBed } from '@angular/core/testing';

import { MethodsService } from './methods.service';

describe('MethodsService', () => {
  let service: MethodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MethodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
