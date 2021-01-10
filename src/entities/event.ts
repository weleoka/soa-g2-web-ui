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

export interface EventI {
  id: string;
  title: string;
  scheduleCode: string; // schedule uuid
  date: Date; // javascript Date object (were only interested in DAY of the year really)
  timeslot: number; // 1 through 5 (this is lektionspass)
  rooms: [];
  equipment: [];
  teachers: [];
}
export class Event implements EventI {
  constructor(date: Date) {
    this.date = date;
  }
  date: Date;
  equipment: [];
  id: string;
  rooms: [];
  scheduleCode: string;
  teachers: [];
  timeslot: number;
  title: string;
}
export const eventFromDto = {
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
};
export const eventToDto = {
  event_code: "id",
  title: "title",
  schedule_code: "scheduleCode",
  date: "date",
  timeslot: "timeslot",
  rooms: "rooms",
  equipment: "equipment",
  teachers: "teachers",
  /* imposed by backend */
  location: "location",
  user_id: "userId",
  contact_name: "contactName",
  distance_url: "distanceUrl",
  event_url: "eventUrl",
  description: "description",
  start_time: "startTime",
  end_time: "endTime",
  session: "session"
};
