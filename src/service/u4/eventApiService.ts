/*EA & SOA Group 2 HT2020

Service for working with backend or middleware apis.
*/

import myAxios from "@/service/myAxios";
// library https://www.npmjs.com/package/object-mapper
import { objectMapper } from "object-mapper";
import { dtoToEvent, Event, eventToDto, Schedule } from "@/service/types";

export default {
  /* Gets events for a schedule */
  async getEventsBySchedule(schedule: Schedule) {
    console.debug("eventApiService->getEventsBySchedule()");
    const params = schedule ? {schedule_code: schedule.id} : {}; //eslint-disable-line
    if (params) {
      // only get events if there is an occasion code
      try {
        const res = await myAxios.get("events", { params });
        console.debug("GET to: " + res.config.baseURL + "/" + res.config.url);
        return await res.data.forEach(dto => objectMapper(dto, dtoToEvent));
      } catch (error) {
        console.error(error);
      }
    } else {
      return false;
    }
  },

  /* POST request with a new event */
  async createNewEvent(event: Event) {
    console.debug("eventApiService->createNewEvent()");
    const data = objectMapper(event, eventToDto);
    try {
      const res = await myAxios.post("events", { data });
      console.debug("POST to: " + res.config.baseURL + "/" + res.config.url);
      // todo: return id from backend?
    } catch (error) {
      console.error(error);
    }
  }
};
