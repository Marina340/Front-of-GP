import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingForLeaderComponent } from './meeting-for-leader.component';

describe('MeetingForLeaderComponent', () => {
  let component: MeetingForLeaderComponent;
  let fixture: ComponentFixture<MeetingForLeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeetingForLeaderComponent]
    });
    fixture = TestBed.createComponent(MeetingForLeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
