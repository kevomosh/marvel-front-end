import { TestBed } from '@angular/core/testing';

import { CharacterParamsService } from './character-params.service';

describe('CharacterParamsService', () => {
  let service: CharacterParamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterParamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
