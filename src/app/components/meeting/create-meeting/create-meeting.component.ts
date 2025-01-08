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
import { ActivatedRoute, Router } from '@angular/router';
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
  route = inject(ActivatedRoute);
  isEditMode = false;
  meetingForm: any;
  meetingId: string | null = null;
  locations: Location[] = [
    { value: 'meeting-room-1', viewValue: 'Meeting Room 1' },
    { value: 'meeting-room-2', viewValue: 'Meeting Room 2' },
    { value: 'meeting-room-3', viewValue: 'Meeting Room 3' },
  ];

  guestsData = this.userService.getAllUsers();

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.meetingId = params['id'];
      this.isEditMode = !!this.meetingId;

      if (this.isEditMode) {
        this.loadMeetingDetails();
      }
    });

    this.initializeForm();
  }
  initializeForm() {
    this.meetingForm = new FormGroup(
      {
        title: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        startDate: new FormControl('', Validators.required),
        startTime: new FormControl('', Validators.required),
        endDate: new FormControl('', Validators.required),
        endTime: new FormControl('', Validators.required),
        location: new FormControl('', Validators.required),
        guests: new FormControl([], Validators.required),
      },
      { validators: this.dateTimeValidator }
    );
  }

  loadMeetingDetails() {
    if (this.meetingId) {
      this.meetingService.getOneMeeting(this.meetingId).subscribe(
        (meeting) => {
          const { guests, ...rest } = meeting;
          this.meetingForm.patchValue({
            ...rest,
            guests: guests.map((guest: { id: string }) => guest.id),
          });
        },
        (error) => console.error('Error loading meeting:', error)
      );
    }
  }

  onReset() {
    this.meetingForm?.reset();
  }

  createMeeting() {
    const formData = this.meetingForm?.value;
    const formattedGuests = (formData.guests ?? []).map((id: string) => ({
      id,
    }));
    const modifiedFormData = { ...formData, guests: formattedGuests };
    this.meetingService.createMeeting(modifiedFormData).subscribe({
      next: (response) => {
        console.log('create meeting success:', response);
        this.router.navigate(['/meetings']);
      },
      error: (error) => {
        console.error('Error in createMeeting', error.error.message);
      },
    });
  }

  updateMeeting() {
    const formData = this.meetingForm?.value;
    const formattedGuests = (formData.guests ?? []).map((id: string) => ({
      id,
    }));
    const modifiedFormData = { ...formData, guests: formattedGuests };
    this.meetingService
      .updateMeeting(modifiedFormData, this.meetingId)
      .subscribe({
        next: (response) => {
          this.router.navigate(['/meetings']);
        },
        error: (error) => {
          console.error('Error in createMeeting', error.error.message);
        },
      });
  }

  onSubmit() {
    if (this.isEditMode) {
      this.updateMeeting();
    } else {
      this.createMeeting();
    }
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
}
