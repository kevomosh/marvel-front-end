import { TestBed } from '@angular/core/testing';

import { MainParamsService } from './main-params.service';

describe('MainParamsService', () => {
  let service: MainParamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainParamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
