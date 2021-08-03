import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSongPopupComponent } from './delete-song-popup.component';

describe('DeleteSongPopupComponent', () => {
  let component: DeleteSongPopupComponent;
  let fixture: ComponentFixture<DeleteSongPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteSongPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSongPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
