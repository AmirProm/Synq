import { TestBed } from '@angular/core/testing';

import { UrlBuilderService } from './url-builder.service';

describe('UrlBuilderService', () => {
  let service: UrlBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
