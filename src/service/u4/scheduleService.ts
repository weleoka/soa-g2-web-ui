/*
EA & SOA Group 2 HT2020

Business logic concerning the workings with courses over API's.
 */
import httpAxios from "@/service/httpAxios";
import { throwApiError } from "@/service/errors";
import { Occasion, Schedule, scheduleFromDto } from "@/service/types";
import { morphism } from "morphism";

export default {
  /* get a list of available schedule codes */
  async getScheduleList() {
    console.debug("scheduleService->getScheduleList()");
    try {
      const res = await httpAxios.get("schedules");
      console.debug(
        "GET request to: " + res.config.baseURL + "/" + res.config.url
      );
      if (res.status === 200) {
        return res.data.map(dto => morphism(scheduleFromDto, dto));
      }
    } catch (error) {
      throwApiError(error.message);
    }
  },

  /* Find one schedule by occasion.
   * Returns array of 1 result */
  async getScheduleByOccasion(occasion: Occasion) {
    console.debug("scheduleService->getScheduleByOccasion(): " + occasion.id);
    const params = occasion ? {occasion_code: occasion.id} : {}; //eslint-disable-line
    try {
      const res = await httpAxios.get("schedules", { params });
      console.debug("GET: " + res.config.baseURL + "/" + res.config.url);
      if (res.status === 200) {
        const arrLen = res.data.length;
        if (arrLen === 1) {
          /*console.debug("1: " + Object.keys(res.data[0]))
          console.debug("2: " + res.data)
          console.debug("2.25: " + (res.data[0]));
          const tmp = await res.data.map(dto => morphism(scheduleFromDto, dto, Schedule));
          console.debug(JSON.stringify(tmp[0]));
          console.debug("2.5: " + (Array.isArray(tmp[0])));
          console.debug("2.5: " + (tmp[0] instanceof Schedule));
          console.debug("3: " + Object.keys(tmp[0]));
          return tmp; */
          return await res.data.map(dto =>
            morphism(scheduleFromDto, dto, Schedule)
          );
        } else {
          throwApiError("Bad number of schedules received: " + arrLen);
        }
      } else {
        throwApiError(res.statusText);
      }
    } catch (error) {
      throwApiError(error.message);
    }
  }
};

/*  /!* Convenience method calling other methods in order *!/
async getCompleteScheduleByOccasion(occasion) {
  console.debug("scheduleService->getCompleteScheduleByOccasion(): " + occasion.id);
  console.warn("Using hard-coded occasion!");
  const res = await this.getScheduleByOccasion(new Occasion("tillfalle03"));
  const schedule: Schedule = await res.data.forEach(dto => objectMapper(dto, dtoToSchedule))[0]; // only expecting 1 result
  console.debug("Setting schedule: " + schedule.id);
  const eventArr: Event[] = await getEventsBySchedule(schedule);
  console.debug("Fetched events from db: " + eventArr.length);
  return eventArr;
},*/
