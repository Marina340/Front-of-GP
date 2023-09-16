import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIdeasComponent } from './admin-ideas.component';

describe('AdminIdeasComponent', () => {
  let component: AdminIdeasComponent;
  let fixture: ComponentFixture<AdminIdeasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminIdeasComponent]
    });
    fixture = TestBed.createComponent(AdminIdeasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
