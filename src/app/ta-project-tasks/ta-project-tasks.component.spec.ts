import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TAProjectTasksComponent } from './ta-project-tasks.component';

describe('TAProjectTasksComponent', () => {
  let component: TAProjectTasksComponent;
  let fixture: ComponentFixture<TAProjectTasksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TAProjectTasksComponent]
    });
    fixture = TestBed.createComponent(TAProjectTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
