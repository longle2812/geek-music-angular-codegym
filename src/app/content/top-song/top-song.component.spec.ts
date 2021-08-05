import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSongComponent } from './top-song.component';

describe('TopSongComponent', () => {
  let component: TopSongComponent;
  let fixture: ComponentFixture<TopSongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopSongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
