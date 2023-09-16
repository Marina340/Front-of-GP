import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorProjectTasksComponent } from './doctor-project-tasks.component';

describe('DoctorProjectTasksComponent', () => {
  let component: DoctorProjectTasksComponent;
  let fixture: ComponentFixture<DoctorProjectTasksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorProjectTasksComponent]
    });
    fixture = TestBed.createComponent(DoctorProjectTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
