/*
EA & SOA Group 2 HT2020

Business logic concerning the workings with courses over API's.
 */
import myAxios from "@/service/myAxios";
import { throwApiError } from "@/service/errors";
import { dtoToSchedule, Occasion } from "@/service/types";
import { objectMapper } from "object-mapper";

export default {
  /* get a list of available schedule codes */
  async getScheduleList() {
    console.debug("getScheduleList()");
    try {
      const res = await myAxios.get("schedules");
      console.debug(
        "GET request to: " + res.config.baseURL + "/" + res.config.url
      );
      return this.scheduleObjectMapper(res.data);
    } catch (error) {
      console.error(error);
    }
  },

  /*  /!* Convenience method calling other methods in order *!/
  async getCompleteScheduleByOccasion(occasion) {
    console.debug("scheduleApiService->getCompleteScheduleByOccasion(): " + occasion.id);
    console.warn("Using hard-coded occasion!");
    const res = await this.getScheduleByOccasion(new Occasion("tillfalle03"));
    const schedule: Schedule = await res.data.forEach(dto => objectMapper(dto, dtoToSchedule))[0]; // only expecting 1 result
    console.debug("Setting schedule: " + schedule.id);
    const eventArr: Event[] = await getEventsBySchedule(schedule);
    console.debug("Fetched events from db: " + eventArr.length);
    return eventArr;
  },*/

  /* Find one or all schedules by occasion.
   * Returns only 1 result in an array. */
  async getScheduleByOccasion(occasion: Occasion) {
    console.debug(
      "scheduleApiService->getScheduleByOccasion(): " + occasion.id
    );
    const params = occasion ? {occasion_code: occasion.id} : {}; //eslint-disable-line
    try {
      const res = await myAxios.get("schedules", { params });
      console.debug("GET: " + res.config.baseURL + "/" + res.config.url);
      if (res.data.length !== 1) {
        throwApiError("Bad response: multiple schedules received.");
      } else {
        return await res.data.forEach(dto => objectMapper(dto, dtoToSchedule));
      }
    } catch (error) {
      throwApiError(error.message);
    }
  }
};
