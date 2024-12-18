import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isDropdownOpen: boolean = false;
  nombre = localStorage.getItem('nombre') + ' ' + localStorage.getItem('apellido');
  email = localStorage.getItem('email');

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
