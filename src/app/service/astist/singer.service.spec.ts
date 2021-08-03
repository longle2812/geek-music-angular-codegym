import { TestBed } from '@angular/core/testing';

import { SingerService } from './singer.service';

describe('ArtistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SingerService = TestBed.get(SingerService);
    expect(service).toBeTruthy();
  });
});
