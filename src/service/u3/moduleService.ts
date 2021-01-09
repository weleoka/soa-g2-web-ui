/*
EA & SOA Group 2 HT2020

This deals with runtime state across the whole app.
Often this is where we would use local storage db and
save state to a db on the client.
 */

import { morphism } from "morphism";
import { Module, moduleFromDto } from "@/service/types";
import requests from "@/service/requests";

export default {
  /* Get modules by course code or get all modules */
  async getModulesByCourseCode(courseCode: string) {
    console.debug(`moduleService->getModulesByCourseCode(): ${courseCode}`);
    const apiCall = `modules`;
    const params = courseCode ? {course_code: courseCode} : {}; //eslint-disable-line
    const res = await requests.getRequest(apiCall, params);
    return res.map(dto => morphism(moduleFromDto, dto, Module));
  }
};
