import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAssignTAsComponent } from './admin-assign-tas.component';

describe('AdminAssignTAsComponent', () => {
  let component: AdminAssignTAsComponent;
  let fixture: ComponentFixture<AdminAssignTAsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAssignTAsComponent]
    });
    fixture = TestBed.createComponent(AdminAssignTAsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
