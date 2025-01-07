import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByStatus',
  standalone: true,
})
export class FilterByStatusPipe implements PipeTransform {
  transform(meetings: any[], status: string): any[] {
    return meetings.filter((meeting) => meeting.status === status);
  }
}
