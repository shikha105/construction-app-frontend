import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { PortfolioService } from '../../../services/portfolio.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-all-portfolios',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe, RouterLink, RouterLinkActive],
  templateUrl: './all-portfolios.component.html',
  styleUrl: './all-portfolios.component.css',
})
export class AllPortfoliosComponent {
  constructor() {
    this.getUserId();
  }

  authService = inject(AuthService);
  http = inject(HttpClient);
  portfolioService = inject(PortfolioService);
  portfolios$!: Observable<any>;
  userId: string | null = null;

  getUserId() {
    const user = this.authService.getUserDetails();
    user.subscribe(
      (response) => {
        this.userId = response.id;
        this.loadPortfolios();
      },
      (error) => {
        console.log(error, 'Error in getUserId()');
      }
    );
  }

  loadPortfolios() {
    if (this.userId) {
      this.portfolios$ = this.portfolioService.getPortfoliosbyUserId(
        this.userId
      );
    }
  }
}
