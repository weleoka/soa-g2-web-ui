/* EA & SOA Group 2 HT2020 */
import requests from "@/service/requests";
import { Event, EventDto, eventFromDto, eventToDto } from "@/entities/event";
import { Schedule } from "@/entities/schedule";
import { ApiTools } from "@/service/utils";

const apiCall = `events`;

export default {
  /* Gets events for a schedule.
   * Currently redundant as schedule object comes with all the events! */
  async getEventsBySchedule(schedule: Schedule) {
    console.debug("eventService->getEventsBySchedule()");
    const params = schedule ? {schedule_code: schedule.id} : {}; //eslint-disable-line
    const res = await requests.getMany(apiCall, params);
    return ApiTools.mapper(eventFromDto, res, Event);
  },

  /* POST request with a new event, also specify which schedule to write it to. */
  async createEvent(event: Event, schedule: Schedule) {
    console.debug(`eventService->createEvent() ${event} ${schedule.id}`);
    const data = ApiTools.singleMapper(eventToDto, event, EventDto);
    return await requests.postRequest(`${apiCall}/${schedule.id}`, data);
  }
};
