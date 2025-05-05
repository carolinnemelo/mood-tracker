import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import {
  CalendarOptions,
  EventInput,
  EventSourceInput,
} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';  
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';




@Component({
  selector: 'app-calendar',
  imports: [FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: this.handleDateClick.bind(this),
    events: [],
  };

  clickedDate = '';

  handleDateClick(info: DateClickArg) {
    this.clickedDate = info.dateStr;
    const events = this.calendarOptions.events as EventInput[];
    events.push({
      title: '😄',
      date: this.clickedDate,
    });

    this.calendarOptions = { ...this.calendarOptions, events: [...events] };
    console.log('events', events);
  }
}
