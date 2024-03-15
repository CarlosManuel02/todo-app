import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { validarTokenGuard } from './validar-token.guard';

describe('validarTokenGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => validarTokenGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
