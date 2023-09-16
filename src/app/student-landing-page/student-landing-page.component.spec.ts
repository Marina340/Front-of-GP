import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentLandingPageComponent } from './student-landing-page.component';

describe('StudentLandingPageComponent', () => {
  let component: StudentLandingPageComponent;
  let fixture: ComponentFixture<StudentLandingPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentLandingPageComponent]
    });
    fixture = TestBed.createComponent(StudentLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
