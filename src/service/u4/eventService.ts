/*EA & SOA Group 2 HT2020

Service for working with backend or middleware apis.
*/

// library https://www.npmjs.com/package/object-mapper
import {morphism} from "morphism";
import {Event, eventFromDto, eventToDto, Schedule} from "@/service/types";
import requests from "@/service/requests";

export default {
  /* Gets events for a schedule */
  async getEventsBySchedule(schedule: Schedule) {
    console.debug("eventService->getEventsBySchedule()");
    const apiCall = `events`;
    const params = schedule ? {schedule_code: schedule.id} : {}; //eslint-disable-line
    const res = await requests.getRequest(apiCall, params);
    return res.map(dto =>
        morphism(eventFromDto, dto, Event)
    );
  },

  /* POST request with a new event */
  async createNewEvent(event: Event) {
    console.debug("eventService->createNewEvent()");
    const apiCall = `events`;
    const data = morphism(eventToDto, event);
    return await requests.getRequest(apiCall, data);
  }
};
