import { Component, inject } from '@angular/core';
import { MeetingService } from '../../../services/meeting.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-meeting',
  standalone: true,
  imports: [],
  templateUrl: './view-meeting.component.html',
  styleUrl: './view-meeting.component.css',
})
export class ViewMeetingComponent {
  constructor(private route: ActivatedRoute) {}
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

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
