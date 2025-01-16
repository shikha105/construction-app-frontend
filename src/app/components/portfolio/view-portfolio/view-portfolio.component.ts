import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PortfolioService } from '../../../services/portfolio.service';
import { NgFor } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-view-portfolio',
  standalone: true,
  imports: [NgFor],
  templateUrl: './view-portfolio.component.html',
  styleUrl: './view-portfolio.component.css',
})
export class ViewPortfolioComponent {
  constructor(private route: ActivatedRoute, private router: Router) {}
  private sub: Subscription = new Subscription();
  portService = inject(PortfolioService);
  authService = inject(AuthService);
  portfolioId: any;
  portfolio: any;
  role: any;
  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.portfolioId = params['id'];
    });
    this.getPortfolioDetails();
    this.getRole();
  }

  getPortfolioDetails() {
    this.portService.getPortfolioById(this.portfolioId).subscribe(
      (response) => {
        this.portfolio = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  navigateToEdit() {
    this.router.navigate(['/portfolios/edit', this.portfolioId]);
  }

  deletePortfolio() {
    this.portService.deletePortfolio(this.portfolioId).subscribe(
      (response) => {
        console.log(response, 'response of delete portfolio');
        this.router.navigate(['/portfolios']);
      },
      (error) => {
        console.log('error in delete portfolio', error);
      }
    );
  }

  getRole() {
    return this.authService.getRole().subscribe(
      (response) => {
        console.log('get role response in view portfolio', response);
        this.role = response;
      },
      (error) => {
        console.log('Error checking role', error);
      }
    );
  }
}
