import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingerSearchComponent } from './singer-search.component';

describe('SingerSearchComponent', () => {
  let component: SingerSearchComponent;
  let fixture: ComponentFixture<SingerSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingerSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingerSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
