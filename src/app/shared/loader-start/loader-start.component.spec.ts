import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderStartComponent } from './loader-start.component';

describe('LoaderStartComponent', () => {
  let component: LoaderStartComponent;
  let fixture: ComponentFixture<LoaderStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaderStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
