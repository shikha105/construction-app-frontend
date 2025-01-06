import { Routes } from '@angular/router';
import { CreateMeetingComponent } from './components/meeting/create-meeting/create-meeting.component';
import { AllMeetingsComponent } from './components/meeting/all-meetings/all-meetings.component';
import { RegistrationComponent } from './components/auth/registration/registration.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ViewMeetingComponent } from './components/meeting/view-meeting/view-meeting.component';
import { UpdateMeetingComponent } from './components/meeting/update-meeting/update-meeting.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AboutComponent } from './components/about/about.component';
import { ProfileComponent } from './components/profile/profile.component';
import { authGuard } from './guards/auth.guard';
import { UsersComponent } from './pages/users/users.component';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
  { path: 'create-meeting', component: CreateMeetingComponent },
  { path: 'all-meetings', component: AllMeetingsComponent },
  { path: 'update-meeting', component: UpdateMeetingComponent },
  { path: 'view-meeting', component: ViewMeetingComponent },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [roleGuard],
    data: { roles: ['ADMIN'] },
  },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  {
    path: 'register',
    component: RegistrationComponent,
    canActivate: [roleGuard],
    data: { roles: ['ADMIN'] },
  },
  { path: '', redirectTo: '/all-meetings', pathMatch: 'full' },
  {
    path: 'about',
    loadComponent: () =>
      import('./components/about/about.component').then(
        (mod) => mod.AboutComponent
      ),
  },
  { path: '**', component: NotFoundComponent },
];
