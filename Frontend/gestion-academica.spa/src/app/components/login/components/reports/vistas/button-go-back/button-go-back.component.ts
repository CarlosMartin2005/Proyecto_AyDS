import { Component } from '@angular/core';

@Component({
  selector: 'app-button-go-back',
  standalone: true,
  imports: [],
  templateUrl: './button-go-back.component.html',
  styleUrl: './button-go-back.component.scss'
})
export class ButtonGoBackComponent {
  constructor() {}

  goBack() {
    window.history.back();
  }
}
