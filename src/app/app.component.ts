import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ViewMeetingComponent } from './components/meeting/view-meeting/view-meeting.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'citb-frontend';
}
