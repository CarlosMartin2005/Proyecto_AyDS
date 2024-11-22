import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackedReportComponent } from './stacked-report.component';

describe('StackedReportComponent', () => {
  let component: StackedReportComponent;
  let fixture: ComponentFixture<StackedReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StackedReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StackedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
