import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isCollapsed = true;

  constructor(private router: Router) {}

  toggleNavbar() {
    this.isCollapsed = !this.isCollapsed;
  }

  isActive(route: string): boolean {
    let ruta = this.router.url;
    // si en alguna parte de la ruta actual se encuentra la ruta que se pasa por parametro
    // console.log(ruta.includes('campus/'+route));
    return ruta.includes('campus/'+route);
  }
}
