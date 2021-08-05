import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSongComponent } from './new-song.component';

describe('SongNewComponent', () => {
  let component: NewSongComponent;
  let fixture: ComponentFixture<NewSongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
