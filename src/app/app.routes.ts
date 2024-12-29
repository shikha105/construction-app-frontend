import { Routes } from '@angular/router';
import { CreateMeetingComponent } from './components/meeting/create-meeting/create-meeting.component';
import { AllMeetingsComponent } from './components/meeting/all-meetings/all-meetings.component';
import { RegistrationComponent } from './components/auth/registration/registration.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ViewMeetingComponent } from './components/meeting/view-meeting/view-meeting.component';
import { UpdateMeetingComponent } from './components/meeting/update-meeting/update-meeting.component';

export const routes: Routes = [
  { path: 'create-meeting', component: CreateMeetingComponent },
  { path: 'all-meetings', component: AllMeetingsComponent },
  { path: 'update-meeting', component: UpdateMeetingComponent },
  { path: 'view-meeting', component: ViewMeetingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
];
