import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Report04Component } from './report-04.component';

describe('Report04Component', () => {
  let component: Report04Component;
  let fixture: ComponentFixture<Report04Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Report04Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Report04Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
