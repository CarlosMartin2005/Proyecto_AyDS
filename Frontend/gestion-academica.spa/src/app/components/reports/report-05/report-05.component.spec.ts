import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Report05Component } from './report-05.component';

describe('Report05Component', () => {
  let component: Report05Component;
  let fixture: ComponentFixture<Report05Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Report05Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Report05Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
