import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ViewMeetingComponent } from './components/meeting/view-meeting/view-meeting.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ViewMeetingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'citb-frontend';
}
