/*
EA & SOA Group 2 HT2020

This deals with runtime state across the whole app.
Often this is where we would use local storage db and
save state to a db on the client.
 */

import httpAxios from "@/service/httpAxios";
import {morphism} from "morphism";
import {moduleFromDto} from "@/service/types";

export default {
  /* Get modules by course code or get all modules */
  async getModulesByCourseCode(courseCode: string) {
    const params = courseCode ? {course_code: courseCode} : {}; //eslint-disable-line
    try {
      const res = await httpAxios.get("/modules", { params });
      console.debug("GET request to: " + res.config.baseURL + res.config.url + res.config.params);
      const asd =  res.data.map(dto => morphism(moduleFromDto, dto));
      return asd;
    } catch (error) {
      console.error(error.message);
    }
  },

  /* Get all the details about a module. */
  async getModuleDetails() {
    // WARN: not implemented.
    try {
      const res = await httpAxios.get("/modules");
      console.debug("GET request to: " + res.config.baseURL + res.config.url);
      return res.data.map(dto => morphism(moduleFromDto, dto));
    } catch (error) {
      console.error(error.message);
    }
  },
};
