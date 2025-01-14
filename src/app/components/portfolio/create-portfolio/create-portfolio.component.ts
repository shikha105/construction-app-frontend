import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'app-create-portfolio',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './create-portfolio.component.html',
  styleUrl: './create-portfolio.component.css',
})
export class CreatePortfolioComponent {
  portfolioForm!: FormGroup;
  files: File[] = [];

  ngOnInit() {
    this.portfolioForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      images: new FormControl(null, Validators.required),
    });
  }

  onReset(): void {
    this.portfolioForm.reset();
    this.files = [];
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const selectedFiles = Array.from(input.files);
      const totalFiles = this.files.length + selectedFiles.length;

      if (totalFiles > 5) {
        alert('you can upload a max of 5 images');
        return;
      }

      this.files = [...this.files, ...selectedFiles];
      this.portfolioForm.get('images')?.setValue(this.files);
    }
  }
  removeFile(index: number): void {
    this.files.splice(index, 1);
    this.portfolioForm.get('images')?.setValue(this.files); // Update the form control
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.portfolioForm.get('title')?.value);
    formData.append(
      'description',
      this.portfolioForm.get('description')?.value
    );

    this.files.forEach((file) => {
      formData.append('images', file);
    });

    (formData as FormData).forEach((value, key) => {
      if (key === 'images') {
        console.log(`${key}: ${(value as File).name}`);
      } else {
        console.log(`${key}: ${value}`);
      }
    });

    (formData as FormData).forEach((data) => {
      console.log('form data ka data', data);
    });
  }
}
