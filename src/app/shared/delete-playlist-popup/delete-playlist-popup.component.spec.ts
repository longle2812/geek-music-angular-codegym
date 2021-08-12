import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePlaylistPopupComponent } from './delete-playlist-popup.component';

describe('DeletePlaylistPopupComponent', () => {
  let component: DeletePlaylistPopupComponent;
  let fixture: ComponentFixture<DeletePlaylistPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletePlaylistPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePlaylistPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
