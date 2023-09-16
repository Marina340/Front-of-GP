import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentNav1Component } from './student-nav1.component';

describe('StudentNav1Component', () => {
  let component: StudentNav1Component;
  let fixture: ComponentFixture<StudentNav1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentNav1Component]
    });
    fixture = TestBed.createComponent(StudentNav1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
