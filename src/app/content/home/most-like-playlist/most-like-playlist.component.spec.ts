import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostLikePlaylistComponent } from './most-like-playlist.component';

describe('MostLikePlaylistComponent', () => {
  let component: MostLikePlaylistComponent;
  let fixture: ComponentFixture<MostLikePlaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostLikePlaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostLikePlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
