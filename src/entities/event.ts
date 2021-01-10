/* aka. reservation in backend, booking? */
/*
events: [ // This is what vuecal uses
  {
    start: '2018-11-21',
    end: '2018-11-21',
    title: 'Need to go shopping',
    content: '<i class="v-icon material-icons">shopping_cart</i>',
    class: 'leisure'
  },
];
*/

/* eslint-disable */

import {createSchema} from "morphism";
export class Event implements EventI {
  constructor(date: Date) {
    this.date = date;
  }
  id: string;
  title: string;
  scheduleCode: string;
  date: Date;
  timeslot: number;
  rooms: [];
  equipment: [];
  teachers: [];
  class: string;
  content: string;
  location: string;
  contactName: string;
  description: string;
  distanceUrl: string;
  end: Date;
  eventUrl: string;
  session: string;
  start: Date;
  userId: number;
  /*content() {
    return '<i class="icon material-icons">block</i><br>' +
        '<p>${this.description}</p>' +
        '<p>${this.location}</p>';
  };*/
}
export interface EventI {
  id: string;
  title: string;
  scheduleCode: string; // schedule uuid
  date: Date; // javascript Date object (were only interested in DAY of the year really)
  timeslot: number; // 1 through 5 (this is lektionspass)
  rooms: [];
  equipment: [];
  teachers: [];
  content: string; // beautiful HTML representation (not passed in DTO)
  /* imposed by backend */
  location: string;
  userId: number,
  contactName: string,
  distanceUrl: string,
  eventUrl: string,
  description: string,
  start: Date,
  end: Date,
  session: string,
}
export interface EventDtoI {
  title: string,
  location: string,
  user_id: number,
  contact_name: string,
  distance_url: string,
  event_url: string,
  description: string,
  start_time: Date,
  end_time: Date,
  session: string
}
export const eventFromDto = createSchema<EventI, EventDtoI>({
  id: "event_code",
  title: "title",
  scheduleCode: "schedule_code",
  date: "date",
  timeslot: "timeslot",
  rooms: "rooms",
  equipment: "equipment",
  teachers: "teachers",
  /* imposed by backend */
  location: "location",
  userId: "user_id",
  contactName: "contact_name",
  distanceUrl: "distance_url",
  eventUrl: "event_url",
  description: "description",
  content: { // todo: fix this to pretty print. Or alternatively let the store process this.
    path: "start_time",
    fn: (str, source) => {
      return '<i class="icon material-icons">block</i>';
    }
  },
  start: {
    path: "start_time",
    fn: (str, source) => {
      return new Date(str);
    }
  },
  end: {
    path: "end_time",
    fn: (str, source) => {
      return new Date(str);
    }
  },
  session: "session"
});
export const eventToDto = createSchema<EventDtoI, EventI>({
  title: "title",
  location: "location",
  user_id: "userId",
  contact_name: "contactName",
  distance_url: "distanceUrl",
  event_url: "eventUrl",
  description: "description",
  start_time: "startTime",
  end_time: "endTime",
  session: "session"
});
