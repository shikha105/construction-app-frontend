import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  userService = inject(UserService);

  users = this.userService.getAllUsers();
}
