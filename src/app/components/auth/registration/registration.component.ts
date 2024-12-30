import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent {
  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  about = new FormControl('');
  role = new FormControl('apprentice', Validators.required);

  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    password: this.password,
    about: this.about,
    role: this.role,
  });

  onSubmit() {
    console.log(this.registerForm.value);
  }
  onReset() {
    this.registerForm.reset();
  }
}
