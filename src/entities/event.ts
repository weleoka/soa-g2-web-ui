/* aka. reservation in backend, booking? */
/*
An event as vuecal wants it input-wise
  {
    start: '2018-11-21',
    end: '2018-11-21',
    title: 'Need to go shopping',
    content: '<i class="v-icon material-icons">shopping_cart</i>',
    class: 'leisure'
  },
];


An Event as it comes out from vue-cal on click.
{
  "_eid": "14_2",
  "start": "2020-10-13T12:00:00.000Z",
  "startTimeMinutes": 780,
  "end": "2020-10-13T13:30:00.000Z",
  "endTimeMinutes": 870,
  "title": "Lektion",
  "content": "<i class=\"icon material-icons\">block</i>",
  "background": false,
  "allDay": false,
  "segments": null,
  "repeat": null,
  "daysCount": 1,
  "deletable": true,
  "deleting": false,
  "titleEditable": true,
  "resizable": true,
  "resizing": false,
  "draggable": true,
  "dragging": false,
  "draggingStatic": false,
  "focused": true,
  "class": "sports",
  "tmpId": "772acf3f-e9d8-412a-9816-df74fbcd5d2b",
  "timeslot": null,
  "location": "Zoom, A211",
  "userId": 0,
  "contactName": "Svante Edzen",
  "distanceUrl": "https://ltu-se.zoom.us/j/983246455",
  "eventUrl": "https://cloud.timeedit.net/ltu/web/schedule1/ri.json?h=t&sid=3&objects=659256.28&ox=0&types=0&fe=0",
  "description": "D0031N. Enterprise Architecture och SOA, D0031N. Enterprise Architecture och SOA"
}



An Event as it comes from the backend after mapping
{
  "tmpId": "eff1bc60-6c4a-48a8-8cb0-94f1b125a0f3",
  "title": "Lektion",
  "timeslot": null,
  "location": "Zoom, A211",
  "userId": 0,
  "contactName": "Ingemar Andersson",
  "distanceUrl": "https://ltu-se.zoom.us/j/518490809",
  "eventUrl": "https://cloud.timeedit.net/ltu/web/schedule1/ri.json?h=t&sid=3&objects=659258.28&ox=0&types=0&fe=0",
  "description": "D0031N. Enterprise Architecture och SOA, D0031N. Enterprise Architecture och SOA",
  "start": "2020-10-20T12:00:00.000Z",
  "end": "2020-10-20T13:30:00.000Z",
  "content": "<i class=\"icon material-icons\">block</i>",
  "class": "sports"
}
*/

/* eslint-disable */
import {v4 as uuidv4} from 'uuid';
import {createSchema, StrictSchema} from "morphism";

export interface EventI {
  tmpId: string; // Due to objects having to "pass-through" vuecal, this is to find them again.
  id: string;
  title: string;
  scheduleCode: string; // schedule uuid
  date: Date; // javascript Date object (were only interested in DAY of the year really)
  timeslot: number; // 1 through 5 (this is lektionspass)
  rooms: [];
  equipment: [];
  teachers: [];
  /* imposed by backend */
  location: string;
  userId: number,
  contactName: string,
  distanceUrl: string,
  eventUrl: string,
  description: string,
  start: Date,
  end: Date,
  /* Vue-cal specifics */
  content: string; // beautiful HTML representation (not passed in DTO)
  class: string
}
export class Event implements EventI {
  constructor(date?: Date) {
    this.start = date ? date : undefined;
  }
  tmpId: string;
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
  eventUrl: string;
  session: string;
  end: Date;
  start: Date;
  userId: number;
  /*content() {
    return '<i class="icon material-icons">block</i><br>' +
        '<p>${this.description}</p>' +
        '<p>${this.location}</p>';
  };*/
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
  rooms: [],
  resources: [],
  session: string
}
export class EventDto implements EventDtoI {
  contact_name: string;
  description: string;
  distance_url: string;
  end_time: Date;
  event_url: string;
  location: string;
  resources: [];
  rooms: [];
  session: string;
  start_time: Date;
  title: string;
  user_id: number;
}
export const eventFromDto = createSchema<EventI, EventDtoI>({
  tmpId: () => uuidv4(),
  id: "event_code",
  title: "title",
  scheduleCode: "schedule_code",
  date: "date",
  timeslot: "session",
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
  /* Vue-cal properties */
  content: {
    path: "content",
    fn: (str, source) => {
      return '<i class="icon material-icons">block</i>';
    }
  },
  class: () => "sports",
});
export const eventToDto: StrictSchema<EventDtoI, EventI> = {
  title: "title",
  location: "location",
  user_id: "userId",
  contact_name: "contactName",
  distance_url: "distanceUrl",
  event_url: "eventUrl",
  description: "description",
  start_time: "start",
  end_time: "end",
  rooms: "rooms",
  resources: "resources",
  session: "timeslot",
};
