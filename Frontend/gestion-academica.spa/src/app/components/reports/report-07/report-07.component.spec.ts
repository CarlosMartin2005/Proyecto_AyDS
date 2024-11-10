import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Report07Component } from './report-07.component';

describe('Report07Component', () => {
  let component: Report07Component;
  let fixture: ComponentFixture<Report07Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Report07Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Report07Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
