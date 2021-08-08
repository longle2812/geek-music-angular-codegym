import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedAlbumComponent } from './featured-album.component';

describe('FeaturedAlbumComponent', () => {
  let component: FeaturedAlbumComponent;
  let fixture: ComponentFixture<FeaturedAlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedAlbumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
