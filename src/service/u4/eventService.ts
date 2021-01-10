/*EA & SOA Group 2 HT2020

Service for working with backend or middleware apis.
*/

// library https://www.npmjs.com/package/object-mapper
import { morphism } from "morphism";
import requests from "@/service/requests";
import { Event, eventFromDto, eventToDto } from "@/entities/event";
import { Schedule } from "@/entities/schedule";

const apiCall = `events`;

export default {
  /* Gets events for a schedule */
  // partially redundant as schedule object comes with all the events!
  async getEventsBySchedule(schedule: Schedule) {
    console.debug("eventService->getEventsBySchedule()");
    const params = schedule ? {schedule_code: schedule.id} : {}; //eslint-disable-line
    const res = await requests.getMany(apiCall, params);
    return res.map(dto => morphism(eventFromDto, dto, Event));
  },

  /* POST request with a new event */
  async createNewEvent(event: Event) {
    console.debug("eventService->createNewEvent()");
    const data = morphism(eventToDto, event);
    return await requests.postRequest(`${apiCall}/${event.scheduleCode}`, data);
  }
};
