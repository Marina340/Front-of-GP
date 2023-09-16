import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsForTeamsComponent } from './requests-for-teams.component';

describe('RequestsForTeamsComponent', () => {
  let component: RequestsForTeamsComponent;
  let fixture: ComponentFixture<RequestsForTeamsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestsForTeamsComponent]
    });
    fixture = TestBed.createComponent(RequestsForTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
