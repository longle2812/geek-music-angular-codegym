import { TestBed } from '@angular/core/testing';

import { SongInteractionService } from './song-interaction.service';

describe('SongInteractionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SongInteractionService = TestBed.get(SongInteractionService);
    expect(service).toBeTruthy();
  });
});
