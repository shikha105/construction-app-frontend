import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  authService = inject(AuthService);
  user: Partial<User> = {};

  ngOnInit() {
    this.getUserDetails();
  }
  private getUserDetails() {
    this.authService.getUserDetails().subscribe(
      (response) => {
        this.user.name = response.name;
        this.user.email = response.email;
        this.user.about = response.about;
        this.user.role = response.role;
      },
      (error) => {
        console.log('Error in user details', error);
      }
    );
  }
}
