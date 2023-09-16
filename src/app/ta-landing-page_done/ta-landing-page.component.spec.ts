import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TALandingPageComponent } from './ta-landing-page.component';

describe('TALandingPageComponent', () => {
  let component: TALandingPageComponent;
  let fixture: ComponentFixture<TALandingPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TALandingPageComponent]
    });
    fixture = TestBed.createComponent(TALandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
