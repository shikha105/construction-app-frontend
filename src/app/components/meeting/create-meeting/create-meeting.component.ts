import { Component, inject } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MeetingService } from '../../../services/meeting.service';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { AsyncPipe } from '@angular/common';
import { NgIf } from '@angular/common';
interface Location {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-create-meeting',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, NgIf],
  templateUrl: './create-meeting.component.html',
  styleUrl: './create-meeting.component.css',
})
export class CreateMeetingComponent {
  meetingService = inject(MeetingService);
  userService = inject(UserService);
  router = inject(Router);

  locations: Location[] = [
    { value: 'meeting-room-1', viewValue: 'Meeting Room 1' },
    { value: 'meeting-room-2', viewValue: 'Meeting Room 2' },
    { value: 'meeting-room-3', viewValue: 'Meeting Room 3' },
  ];

  guestsData = this.userService.getAllUsers();

  items = ['shikha105789@gmail.com', 'xyzbdhjd'];
  title = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  startDate = new FormControl('', Validators.required);
  startTime = new FormControl('', Validators.required);
  endDate = new FormControl('', Validators.required);
  endTime = new FormControl('', Validators.required);
  location = new FormControl('', Validators.required);
  guests = new FormControl([], Validators.required);

  meetingForm = new FormGroup(
    {
      title: this.title,
      description: this.description,
      startDate: this.startDate,
      startTime: this.startTime,
      endDate: this.endDate,
      endTime: this.endTime,
      location: this.location,
      guests: this.guests,
    },
    { validators: this.dateTimeValidator }
  );

  onReset() {
    this.meetingForm.reset;
  }

  onSubmit() {
    console.log(this.meetingForm.value, 'meeting form value');
    const formData = this.meetingForm.value;
    const formattedGuests = (formData.guests ?? []).map((id: string) => ({
      id,
    }));
    const modifiedFormData = { ...formData, guests: formattedGuests };
    this.meetingService.createMeeting(modifiedFormData).subscribe({
      next: (response) => {
        console.log('create meeting success:', response);
        this.router.navigate(['/all-meetings']);
      },
      error: (error) => {
        console.error('Error in createMeeting', error.error.message);
      },
    });
  }

  dateTimeValidator(group: AbstractControl): ValidationErrors | null {
    const startDate = group.get('startDate')?.value;
    const startTime = group.get('startTime')?.value;
    const endDate = group.get('endDate')?.value;
    const endTime = group.get('endTime')?.value;

    if (startDate && startTime && endDate && endTime) {
      const start = new Date(`${startDate}T${startTime}`);
      const end = new Date(`${endDate}T${endTime}`);

      if (start >= end) {
        return {
          invalidDateTime: 'Start date/time must be before end date/time.',
        };
      }
    }

    return null;
  }

  myFunction() {
    console.log('my function should do something i guess');
  }
}
