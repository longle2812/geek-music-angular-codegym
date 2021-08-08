import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSongPlaylistComponent } from './add-song-playlist.component';

describe('AddSongPlaylistComponent', () => {
  let component: AddSongPlaylistComponent;
  let fixture: ComponentFixture<AddSongPlaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSongPlaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSongPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
