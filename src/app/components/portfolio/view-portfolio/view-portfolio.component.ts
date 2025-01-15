import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PortfolioService } from '../../../services/portfolio.service';
import { NgFor } from '@angular/common';

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
  portfolioId: any;
  portfolio: any;
  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.portfolioId = params['id'];
    });
    this.getPortfolioDetails();
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
}
