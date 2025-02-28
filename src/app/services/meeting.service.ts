import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MeetingService {
  constructor(private http: HttpClient) {}
  private apiUrl = environment.apiUrl;

  createMeeting(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/meetings`, data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
  updateMeeting(data: any, meetingId: any): Observable<any> {
    if (!meetingId) {
      return throwError(() => new Error('meetingId is missing'));
    }
    return this.http
      .put<any>(`${this.apiUrl}/meetings/${meetingId}`, data)
      .pipe(
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

  getMeetings(userId: any): Observable<any> {
    if (!userId) {
      return throwError(() => new Error('could not get the user id'));
    }

    return this.http
      .get<any>(`${this.apiUrl}/meetings/getAll/${userId}`)
      .pipe(catchError(this.handleError));
  }

  getOneMeeting(meetingId: any): Observable<any> {
    if (!meetingId) {
      return throwError(() => new Error('could not get the meeting Id'));
    }

    return this.http
      .get<any>(`${this.apiUrl}/meetings/${meetingId}`)
      .pipe(catchError(this.handleError));
  }

  cancelMeeting(meetingId: any): Observable<any> {
    if (!meetingId) {
      return throwError(() => new Error('could not get the meeting id'));
    }

    return this.http
      .put<any>(`${this.apiUrl}/meetings/cancel/${meetingId}`, {})
      .pipe(catchError(this.handleError));
  }
}
