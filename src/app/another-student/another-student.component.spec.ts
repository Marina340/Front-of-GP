import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnotherStudentComponent } from './another-student.component';

describe('AnotherStudentComponent', () => {
  let component: AnotherStudentComponent;
  let fixture: ComponentFixture<AnotherStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnotherStudentComponent]
    });
    fixture = TestBed.createComponent(AnotherStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
