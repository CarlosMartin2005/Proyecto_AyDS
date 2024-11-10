import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Report06Component } from './report-06.component';

describe('Report06Component', () => {
  let component: Report06Component;
  let fixture: ComponentFixture<Report06Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Report06Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Report06Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
