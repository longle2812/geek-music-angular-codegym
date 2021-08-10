import { TestBed } from '@angular/core/testing';

import { PlaylistInteractionService } from './playlist-interaction.service';

describe('PlaylistInteractionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlaylistInteractionService = TestBed.get(PlaylistInteractionService);
    expect(service).toBeTruthy();
  });
});
