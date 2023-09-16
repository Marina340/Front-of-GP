import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableIdeasComponent } from './available-ideas.component';

describe('AvailableIdeasComponent', () => {
  let component: AvailableIdeasComponent;
  let fixture: ComponentFixture<AvailableIdeasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AvailableIdeasComponent]
    });
    fixture = TestBed.createComponent(AvailableIdeasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
