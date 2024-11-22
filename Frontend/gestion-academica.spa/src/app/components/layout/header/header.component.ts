import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isOpen = false;
  screenLarge = window.innerWidth >= 640;

  constructor(private router: Router) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.screenLarge = window.innerWidth >= 640;
  }

  isActive(route: string): boolean {
    return this.router.url === `/${route}`;
  }
}
