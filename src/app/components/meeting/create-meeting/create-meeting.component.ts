import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

interface Location {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-create-meeting',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-meeting.component.html',
  styleUrl: './create-meeting.component.css',
})
export class CreateMeetingComponent {
  locations: Location[] = [
    { value: 'meeting-room-1', viewValue: 'Meeting Room 1' },
    { value: 'meeting-room-2', viewValue: 'Meeting Room 2' },
    { value: 'meeting-room-3', viewValue: 'Meeting Room 3' },
  ];

  items = ['shikha105789@gmail.com', 'xyzbdhjd'];
  title = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  startDate = new FormControl('', Validators.required);
  startTime = new FormControl('', Validators.required);
  endDate = new FormControl('', Validators.required);
  endTime = new FormControl('', Validators.required);
  location = new FormControl('', Validators.required);
  guests = new FormControl('', Validators.required);

  meetingForm = new FormGroup({
    title: this.title,
    description: this.description,
    startDate: this.startDate,
    startTime: this.startTime,
    endDate: this.endDate,
    endTime: this.endTime,
    location: this.location,
    guests: this.guests,
  });

  onReset() {
    this.meetingForm.reset;
  }

  onSubmit() {
    console.log(this.meetingForm.value);
  }

  myFunction() {
    console.log('my function should do something i guess');
  }
}
