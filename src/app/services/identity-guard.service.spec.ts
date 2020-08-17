import { TestBed } from '@angular/core/testing';

import { IdentityGuardService } from './identity-guard.service';

describe('IdentityGuardService', () => {
  let service: IdentityGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdentityGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
