import { Component, Output, EventEmitter } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import * as moment from 'moment';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-date-range-picker',
  standalone: true,
  imports: [MatDatepickerModule, MatFormFieldModule, MatInputModule, FormsModule, MatNativeDateModule, CommonModule, MatSnackBarModule],
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] }
  ]
})
export class DateRangePickerComponent {
  startDate: Date | null = null;
  endDate: Date | null = null;

  @Output() dateRangeSelected = new EventEmitter<{ startDate: Date | null, endDate: Date | null }>();

  constructor(private dateAdapter: DateAdapter<Date>, private snackBar: MatSnackBar) {
    this.dateAdapter.setLocale('es-ES');
  }

  onDateChange() {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to midnight for comparison

    // Validar solo si ambas fechas están completamente ingresadas
    if (this.startDate && this.endDate) {
      if (this.startDate > this.endDate) {
        this.showError('La fecha de inicio no puede ser mayor que la fecha de fin.');
        this.resetDates();
        return;
      }

      if (this.endDate < this.startDate) {
        this.showError('La fecha de fin no puede ser anterior a la fecha de inicio.');
        this.resetDates();
        return;
      }

      if (this.startDate > today || this.endDate > today) {
        this.showError('Las fechas no pueden ser después de hoy.');
        this.resetDates();
        return;
      }

      this.dateRangeSelected.emit({ startDate: this.startDate, endDate: this.endDate });
    }
  }

  showError(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: ['snackbar-error'],
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }

  resetDates() {
    this.startDate = null;
    this.endDate = null;
  }
}