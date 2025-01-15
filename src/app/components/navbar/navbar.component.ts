import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
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
    this.getRole();
  }

  authService = inject(AuthService);
  router = inject(Router);
  name: string | null = null;
  role: string | null = null;
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
        console.log('get name', this.name);
      },
      (error) => {
        console.log(error, 'Error in getName()');
      }
    );
  }

  getRole() {
    return this.authService.getRole().subscribe(
      (response) => {
        console.log('get role response', response);
        this.role = response;
      },
      (error) => {
        console.log('Error checking role', error);
      }
    );
  }
}
