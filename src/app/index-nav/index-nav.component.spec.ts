import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexNavComponent } from './index-nav.component';

describe('IndexNavComponent', () => {
  let component: IndexNavComponent;
  let fixture: ComponentFixture<IndexNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndexNavComponent]
    });
    fixture = TestBed.createComponent(IndexNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
