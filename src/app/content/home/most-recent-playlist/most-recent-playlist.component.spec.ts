import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostRecentPlaylistComponent } from './most-recent-playlist.component';

describe('MostRecentPlaylistComponent', () => {
  let component: MostRecentPlaylistComponent;
  let fixture: ComponentFixture<MostRecentPlaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostRecentPlaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostRecentPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
