import { NgStyle } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { Emoji } from '../../types/emoji.type';

@Component({
  selector: 'app-calendar',
  imports: [FullCalendarModule, NgStyle],
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
  isModalOpen = signal(false);
  emojis = [
    {
      id: 5,
      label: 'happy',
      value: '😄',
    },
    {
      id: 4,
      label: 'neutral',
      value: '😐',
    },
    {
      id: 3,
      label: 'anxious',
      value: '😰',
    },
    {
      id: 2,
      label: 'angry',
      value: '😡',
    },
    {
      id: 1,
      label: 'sad',
      value: '😢',
    },
  ];

  handleDateClick(info: DateClickArg) {
    this.clickedDate = info.dateStr;
    this.isModalOpen.set(true);
  }
  
  handleEmojiClick(emoji: Emoji) {
    const events = this.calendarOptions.events as EventInput[];
    events.push({
      title: emoji.value,
      date: this.clickedDate,
    });
    this.calendarOptions = { ...this.calendarOptions, events: [...events] };
    this.isModalOpen.set(false);
  }
}
