import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-calendar',
  imports: [FullCalendarModule, NgStyle],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent {
  @ViewChild('calendar') calendarRef!: ElementRef;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: this.handleDateClick.bind(this),
    events: [],
  };

  clickedDate = '';
  isMenuOpen = false;
  clickedDayElement: HTMLElement | null = null;

  handleDateClick(info: DateClickArg) {
    this.clickedDate = info.dateStr;
    this.clickedDayElement = info.dayEl;
    const events = this.calendarOptions.events as EventInput[];
    events.push({
      title: '😄',
      date: this.clickedDate,
    });

    this.calendarOptions = { ...this.calendarOptions, events: [...events] };
    this.menuStyle;
  }

  get menuStyle() {
    if (!this.clickedDayElement) return;
    const rect = this.clickedDayElement.getBoundingClientRect();
    return {
    position: 'absolute',
    top: `${rect.top + window.scrollY}px`,
    left: `${rect.left + window.scrollX}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
  };
  }
}
