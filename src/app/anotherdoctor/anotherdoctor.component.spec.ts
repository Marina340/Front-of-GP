import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnotherdoctorComponent } from './anotherdoctor.component';

describe('AnotherdoctorComponent', () => {
  let component: AnotherdoctorComponent;
  let fixture: ComponentFixture<AnotherdoctorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnotherdoctorComponent]
    });
    fixture = TestBed.createComponent(AnotherdoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
