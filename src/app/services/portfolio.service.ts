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
}
