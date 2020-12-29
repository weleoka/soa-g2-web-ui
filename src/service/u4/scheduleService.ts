/*
EA & SOA Group 2 HT2020

Business logic concerning the workings with courses over API's.
 */
import httpAxios from "@/service/httpAxios";
import {throwApiError} from "@/service/errors";
import {Occasion, scheduleFromDto} from "@/service/types";
import {morphism} from "morphism";

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
        return res.data.map(dto => morphism(scheduleFromDto, dto))
      }
    } catch (error) {
      console.error(error);
    }
  },

  /* Find one schedule by occasion.
   * Returns only 1 result in an array. */
  async getScheduleByOccasion(occasion: Occasion) {
    console.debug(
      "scheduleService->getScheduleByOccasion(): " + occasion.id
    );
    const params = occasion ? {occasion_code: occasion.id} : {}; //eslint-disable-line
    try {
      const res = await httpAxios.get("schedules", { params });
      console.debug("GET: " + res.config.baseURL + "/" + res.config.url);
      if (res.status === 200) {
        if (res.data.length === 1) {
          return await res.data.map(dto => morphism(scheduleFromDto, dto));
        } else {
          throwApiError("Bad number of schedules received.");
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
