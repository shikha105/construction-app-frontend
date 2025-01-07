import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { MeetingService } from '../../../services/meeting.service';
import { AsyncPipe } from '@angular/common';
import { NgIf, NgFor } from '@angular/common';
import { DatePipe } from '@angular/common';
import { FilterByStatusPipe } from '../../../pipes/filter-by-status.pipe';

@Component({
  selector: 'app-all-meetings',
  standalone: true,
  imports: [AsyncPipe, DatePipe, FilterByStatusPipe, NgIf, NgFor],
  templateUrl: './all-meetings.component.html',
  styleUrl: './all-meetings.component.css',
})
export class AllMeetingsComponent {
  constructor() {
    this.getUserId();
  }
  authService = inject(AuthService);
  http = inject(HttpClient);
  meetingService = inject(MeetingService);
  meetings$!: Observable<any>;
  userId: string | null = null;

  getUserId() {
    const user = this.authService.getUserDetails();
    user.subscribe(
      (response) => {
        this.userId = response.id;
        this.loadMeetings();
      },
      (error) => {
        console.log(error, 'Error in getUserId()');
      }
    );
  }

  loadMeetings() {
    if (this.userId) {
      this.meetings$ = this.meetingService.getMeetings(this.userId);
    }
  }
}
