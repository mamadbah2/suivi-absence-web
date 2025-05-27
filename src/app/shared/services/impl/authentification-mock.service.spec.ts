import { TestBed } from '@angular/core/testing';

import { AuthentificationMockService } from './authentification-mock.service';

describe('AuthentificationMockService', () => {
  let service: AuthentificationMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthentificationMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
