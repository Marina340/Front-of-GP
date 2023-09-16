import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendRequestsFromTeamComponent } from './send-requests-from-team.component';

describe('SendRequestsFromTeamComponent', () => {
  let component: SendRequestsFromTeamComponent;
  let fixture: ComponentFixture<SendRequestsFromTeamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SendRequestsFromTeamComponent]
    });
    fixture = TestBed.createComponent(SendRequestsFromTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
