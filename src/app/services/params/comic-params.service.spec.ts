import { TestBed } from '@angular/core/testing';

import { ComicParamsService } from './comic-params.service';

describe('ComicParamsService', () => {
  let service: ComicParamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComicParamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
