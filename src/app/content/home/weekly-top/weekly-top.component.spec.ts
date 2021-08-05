import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyTopComponent } from './weekly-top.component';

describe('WeeklyTopComponent', () => {
  let component: WeeklyTopComponent;
  let fixture: ComponentFixture<WeeklyTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeklyTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
