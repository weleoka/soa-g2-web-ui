/* aka. reservation in backend */

/* eslint-disable */

export interface EventI {
  id: string;
  title: string;
  scheduleCode: string; // schedule uuid
  datetime: Date; // javascript Date object (were only interested in DAY of the year really)
  timeslot: number; // 1 through 5 (this is lektionspass)
  rooms: [];
  equipment: [];
  teachers: [];
}
export class Event implements EventI {
  constructor(datetime: Date) {
    this.datetime = datetime;
  }
  datetime: Date;
  equipment: [];
  id: string;
  rooms: [];
  scheduleCode: string;
  teachers: [];
  timeslot: number;
  title: string;
  /* imposed by backend */
  location: string;
  userId: number;
  contactName: string;
  distanceUrl: string;
  eventUrl: string;
  description: string;
  startTime: Date;
  endTime: Date;
  session: string;
}
export const eventFromDto = {
  id: "event_code",
  title: "title",
  scheduleCode: "schedule_code",
  datetime: "datetime",
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
  startTime: "start_time",
  endTime: "end_time",
  session: "session"
};
export const eventToDto = {
  event_code: "id",
  title: "title",
  schedule_code: "scheduleCode",
  datetime: "datetime",
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
