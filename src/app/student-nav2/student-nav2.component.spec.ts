import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentNav2Component } from './student-nav2.component';

describe('StudentNav2Component', () => {
  let component: StudentNav2Component;
  let fixture: ComponentFixture<StudentNav2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentNav2Component]
    });
    fixture = TestBed.createComponent(StudentNav2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
