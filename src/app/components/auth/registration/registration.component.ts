import { Component, inject } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Role } from '../../../interfaces/role';
@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent {
  authService = inject(AuthService);
  router = inject(Router);

  roles: Role[] = [
    { id: '501', name: 'OFFICER' },
    { id: '502', name: 'APPRENTICE' },
  ];
  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  about = new FormControl('');
  role = new FormControl(this.roles[1].name, Validators.required);

  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    password: this.password,
    about: this.about,
    role: this.role,
  });

  onSubmit() {
    const formData = this.registerForm.value;
    const selectedRole = this.roles.find((r) => r.name === formData.role);
    const modifiedFormData = { ...formData, role: selectedRole };
    this.authService.register(modifiedFormData).subscribe({
      next: (response) => {
        console.log('register success:', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registration error: ', error);
      },
    });
  }
  onReset() {
    this.registerForm.reset();
  }
}
