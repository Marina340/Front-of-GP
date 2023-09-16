import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeasRequestsComponent } from './ideas-requests.component';

describe('IdeasRequestsComponent', () => {
  let component: IdeasRequestsComponent;
  let fixture: ComponentFixture<IdeasRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IdeasRequestsComponent]
    });
    fixture = TestBed.createComponent(IdeasRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
