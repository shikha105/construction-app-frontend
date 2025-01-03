import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { LoginResponse } from '../interfaces/login-response';
import { catchError, map, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { jwtDecode } from 'jwt-decode';
import { RegisterResponse } from '../interfaces/register-reponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private jwtToken = 'jwtToken';
  private isBrowser: boolean = typeof window !== 'undefined';
  constructor(private http: HttpClient) {}

  login(data: any): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/auth/login`, data)
      .pipe(
        map((response: LoginResponse) => {
          if (this.isBrowser) {
            localStorage.setItem(this.jwtToken, response.jwtToken);
          }
          return response;
        }),
        catchError(this.handleError)
      );
  }

  register(data: any): Observable<RegisterResponse> {
    return this.http
      .post<RegisterResponse>(`${this.apiUrl}/auth/register`, data)
      .pipe(
        map((response: RegisterResponse) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  getUserDetails(): Observable<any> {
    const username = this.getUsername();
    if (!username) {
      return throwError(() => new Error('could not get the user name'));
    }

    return this.http
      .get<any>(`${this.apiUrl}/users/getUserBy/${username}`)
      .pipe(catchError(this.handleError));
  }

  getToken() {
    return this.isBrowser ? localStorage.getItem(this.jwtToken) : '';
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    return !this.isTokenExpired();
  }

  private isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;
    const decoded = jwtDecode(token);
    const isTokenExpired = Date.now() > decoded['exp']! * 1000;
    if (isTokenExpired) this.logout();
    return isTokenExpired;
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem(this.jwtToken);
    }
  }

  getUsername = () => {
    const token = this.getToken();
    if (!token) return null;
    const decoded = jwtDecode(token);
    return decoded.sub;
  };

  private handleError(error: any): Observable<never> {
    console.error('HTTP Error:', error);
    return throwError(() => error);
  }
}
