import { Component, inject } from '@angular/core';
import { MeetingService } from '../../../services/meeting.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-view-meeting',
  standalone: true,
  imports: [NgIf],
  templateUrl: './view-meeting.component.html',
  styleUrl: './view-meeting.component.css',
})
export class ViewMeetingComponent {
  constructor(private route: ActivatedRoute, private router: Router) {}
  meetingService = inject(MeetingService);
  private sub: Subscription = new Subscription();
  meetingId: any;
  meeting: any;

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.meetingId = params['id'];
    });
    this.getMeetingDetails();
  }

  getMeetingDetails() {
    this.meetingService.getOneMeeting(this.meetingId).subscribe(
      (response) => {
        this.meeting = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  navigateToEdit() {
    this.router.navigate(['/meetings/edit', this.meetingId]);
  }

  cancelMeeting() {
    this.meetingService.cancelMeeting(this.meetingId).subscribe(
      (response) => {
        console.log(response, 'response of cancel meeting');
      },
      (error) => {
        console.log('error in cancel meeting', error);
      }
    );
    this.router.navigate(['/meetings']);
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
