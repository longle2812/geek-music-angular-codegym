import { TestBed } from '@angular/core/testing';

import { SingerInteractionService } from './singer-interaction.service';

describe('SingerInteractionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SingerInteractionService = TestBed.get(SingerInteractionService);
    expect(service).toBeTruthy();
  });
});
