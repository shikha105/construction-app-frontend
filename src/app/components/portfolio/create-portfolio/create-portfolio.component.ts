import { Component, inject } from '@angular/core';
import { PortfolioService } from '../../../services/portfolio.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

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
  constructor(
    private portfolioService: PortfolioService,
    private router: Router
  ) {}

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

    const portfolio = {
      title: this.portfolioForm.get('title')?.value,
      description: this.portfolioForm.get('description')?.value,
    };
    formData.append(
      'portfolio',
      new Blob([JSON.stringify(portfolio)], { type: 'application/json' })
    );

    this.files.forEach((file) => {
      const blob = new Blob([file], { type: file.type });
      formData.append('images', blob, file.name);
    });

    this.portfolioService.createPortfolio(formData).subscribe({
      next: (response) => {
        console.log('create portfolio:', response);
        this.router.navigate(['/portfolios']);
      },
      error: (error) => {
        console.error('Error in portfoilo creation', error.error.message);
      },
    });
  }
}
