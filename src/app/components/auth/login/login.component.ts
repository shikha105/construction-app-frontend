import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { response } from 'express';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private router: Router, private authService: AuthService) {}

  username = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  loginForm = new FormGroup({
    username: this.username,
    password: this.password,
  });

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log('Login success:', response);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error in Login', error.error.message);
      },
    });
  }
  onReset() {
    this.loginForm.reset();
  }
}
