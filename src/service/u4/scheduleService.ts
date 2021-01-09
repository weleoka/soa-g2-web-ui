/*
EA & SOA Group 2 HT2020

Business logic concerning the workings with courses over API's.
 */
import { Occasion, Schedule, scheduleFromDto } from "@/service/types";
import { morphism } from "morphism";
import requests from "@/service/requests";

export default {
  /* get a list of available schedule codes */
  async getScheduleList() {
    console.debug("scheduleService->getScheduleList()");
    const apiCall = `schedules`;
    const params = {};
    const res = await requests.getRequest(apiCall, params);
    return res.map(dto => morphism(scheduleFromDto, dto, Schedule));
  },

  // todo: make unique result check.
  /* Find schedule by occasion, returns array of 1 result */
  async getScheduleByOccasion(occasion: Occasion) {
    console.debug("scheduleService->getScheduleByOccasion(): " + occasion.id);
    const apiCall = `schedules`;
    const params = occasion ? {occasion_code: occasion.id} : {}; //eslint-disable-line
    const res = await requests.getRequest(apiCall, params);
    return res.map(dto => morphism(scheduleFromDto, dto, Schedule));
  }
};
