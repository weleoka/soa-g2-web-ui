/*
EA & SOA Group 2 HT2020

Business logic concerning the workings with course occasions.
 */
import httpAxios from "@/service/httpAxios";
import { Course, Occasion, occasionFromDto } from "@/service/types";
import { morphism } from "morphism";
import { throwApiError, throwApiResponseError } from "@/service/errors";

export default {
  /* Gets occasions by course, or all if no course specified */
  async getOccasions(course?: Course) {
    console.debug(`occasionService->getOccasions()`);
    const param = course ? {course_code: course.id} : ""; //eslint-disable-line
    const apiCall = `/occasions/${param}`;
    const data = {};
    try {
      const res = await httpAxios.get(apiCall, data);
      console.debug(`GET: ${res.config.baseURL}/${res.config.url}`);
      if (res.status === 200) {
        if (res.data.length) {
          return res.data.map(dto => morphism(occasionFromDto, dto, Occasion));
        }
        return [];
      } else {
        throwApiResponseError(res);
        return [];
      }
    } catch (error) {
      throwApiError(error.message);
      return [];
    }
  }
  /*    /!* Gets occasions by course code, or all if no course code specified *!/
  async getOccasions(course?: Course) {
    const params = course.id ? {course_code: course.id} : {}; //eslint-disable-line
    //const params = {course_code: course.id}; //eslint-disable-line
    try {
      const res = await httpAxios.get("occasions", { params });
      console.debug("GET: " + res.config.baseURL + "/" + res.config.url);
      return await res.data.map(dto => morphism(occasionFromDto, dto));
    } catch (error) {
      console.error(error);
    }
  }*/

  /*
  /!* Gets a single occasion *!/
  async getOccasion(occasionCode: string) {
    const params = occasionCode ? {occasion_code: occasionCode} : {}; //eslint-disable-line
    try {
      const res = await httpAxios.get("occasions", { params });
      console.debug(
        "GET request to: " + res.config.baseURL + "/" + res.config.url
      );
      if (res.data.length === 1) {
        return this.occasionObjectMapper(res.data);
      } else {
        throwApiResponseError("API error, more than one occasions returned!");
      }
    } catch (error) {
      throwApiResponseError(error.message);
    }
  },
*/
};
