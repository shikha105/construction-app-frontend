import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Portfolio } from '../interfaces/portfolio';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createPortfolio(data: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/portfolios`, data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('HTTP Error:', error);
    return throwError(() => error);
  }

  getPortfoliosbyUserId(userId: any): Observable<any> {
    if (!userId) {
      return throwError(() => new Error('could not get the user id'));
    }

    return this.http
      .get<any>(`${this.apiUrl}/portfolios/getAll/${userId}`)
      .pipe(catchError(this.handleError));
  }

  getPortfolioById(portfolioId: any): Observable<any> {
    if (!portfolioId) {
      return throwError(() => new Error('could not get the portfolio Id'));
    }

    return this.http
      .get<any>(`${this.apiUrl}/portfolios/${portfolioId}`)
      .pipe(catchError(this.handleError));
  }
}
