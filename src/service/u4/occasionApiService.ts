/*
EA & SOA Group 2 HT2020

Business logic concerning the workings with course occasions.
 */
import myAxios from "@/service/myAxios";
import { Course, dtoToOccasion } from "@/service/types";
import { objectMapper } from "object-mapper";

export default {
  /* Gets occasions by course code, or all if no course code specified */
  async getOccasions(course?: Course) {
    //const params = course.id ? {course_code: course.id} : {}; //eslint-disable-line
    const params = {course_code: course.id}; //eslint-disable-line
    try {
      const res = await myAxios.get("occasions", { params });
      console.debug("GET: " + res.config.baseURL + "/" + res.config.url);
      return await res.data.forEach(dto => objectMapper(dto, dtoToOccasion));
    } catch (error) {
      console.error(error);
    }
  }

  /*
  /!* Gets a single occasion *!/
  async getOccasion(occasionCode: string) {
    const params = occasionCode ? {occasion_code: occasionCode} : {}; //eslint-disable-line
    try {
      const res = await myAxios.get("occasions", { params });
      console.debug(
        "GET request to: " + res.config.baseURL + "/" + res.config.url
      );
      if (res.data.length === 1) {
        return this.occasionObjectMapper(res.data);
      } else {
        throwApiError("API error, more than one occasions returned!");
      }
    } catch (error) {
      throwApiError(error.message);
    }
  },
*/
};
