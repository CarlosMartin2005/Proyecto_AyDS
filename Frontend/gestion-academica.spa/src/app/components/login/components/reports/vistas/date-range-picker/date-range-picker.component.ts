import { Component, Output, EventEmitter } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-date-range-picker',
  standalone: true,
  imports: [MatDatepickerModule, MatFormFieldModule, MatInputModule, FormsModule, MatNativeDateModule],
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss']
})
export class DateRangePickerComponent {
  startDate: Date | null = null;
  endDate: Date | null = null;

  @Output() dateRangeSelected = new EventEmitter<{ startDate: Date | null, endDate: Date | null }>();

  onDateChange() {
    this.dateRangeSelected.emit({ startDate: this.startDate, endDate: this.endDate });
  }
}