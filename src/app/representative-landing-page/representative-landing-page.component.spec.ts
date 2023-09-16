import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepresentativeLandingPageComponent } from './representative-landing-page.component';

describe('RepresentativeLandingPageComponent', () => {
  let component: RepresentativeLandingPageComponent;
  let fixture: ComponentFixture<RepresentativeLandingPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepresentativeLandingPageComponent]
    });
    fixture = TestBed.createComponent(RepresentativeLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
