import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { map } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor() {}

  ngOnInit() {
    this.getName();
    this.hasRole('ADMIN');
  }

  authService = inject(AuthService);
  router = inject(Router);
  name: string | null = null;
  isAdmin = false;

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

  hasRole(role: string) {
    return this.authService
      .getRole()
      .pipe(map((userRole: string) => userRole === role))
      .subscribe(
        (hasAccess) => {
          this.isAdmin = hasAccess;
        },
        (error) => {
          console.log('Error checking role', error);
        }
      );
  }
}
