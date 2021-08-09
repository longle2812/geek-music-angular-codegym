import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostLikeSongComponent } from './most-like-song.component';

describe('MostLikeSongComponent', () => {
  let component: MostLikeSongComponent;
  let fixture: ComponentFixture<MostLikeSongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostLikeSongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostLikeSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
