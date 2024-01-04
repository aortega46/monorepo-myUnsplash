import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsplashScreenComponent } from './unsplash-screen.component';

describe('UnsplashScreenComponent', () => {
  let component: UnsplashScreenComponent;
  let fixture: ComponentFixture<UnsplashScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnsplashScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnsplashScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
