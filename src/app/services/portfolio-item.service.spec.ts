import { TestBed, inject } from '@angular/core/testing';

import { PortfolioItemService } from './portfolio-item.service';

describe('PortfolioItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PortfolioItemService]
    });
  });

  it('should be created', inject([PortfolioItemService], (service: PortfolioItemService) => {
    expect(service).toBeTruthy();
  }));
});
