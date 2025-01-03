import { Component, inject, Inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';
import { Role } from '../../interfaces/role';
import { error } from 'console';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor() {
    this.getName();
  }

  authService = inject(AuthService);
  router = inject(Router);
  name: string | null = null;

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  getName() {
    const user = this.authService.getUserDetails();
    user.subscribe(
      (response) => {
        this.name = response.name;
      },
      (error) => {
        console.log(error, 'Error in getName()');
      }
    );
  }
}
