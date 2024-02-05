import { TestBed } from '@angular/core/testing';

import { ScrapperService } from './scrapper.service';

describe('ScrapperService', () => {
  let service: ScrapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
