/*
EA & SOA Group 2 HT2020

Business logic concerning the workings with courses over API's.
 */
import httpAxios from "@/service/httpAxios";
import { courseFromDto } from "@/service/types";
import { morphism } from "morphism";
import { throwApiError } from "@/service/errors";

export default {
  /* get a list of available courses */
  async getCourses() {
    console.debug("courseService->getCourses()");
    try {
      const res = await httpAxios.get("courses");
      console.debug("GET: " + res.config.baseURL + "/" + res.config.url);
      return await res.data.map(dto => morphism(courseFromDto, dto));
    } catch (error) {
      console.error(error);
    }
  },

  /* Find a course in API by courseCode */
  // todo: probably make it GET to endpoint as: /courses/{courseCode}
  async getCourseByCourseCode(courseCode?: string) {
    console.debug("courseService->getCourseByCourseCode(): " + courseCode);
    const params = courseCode ? {course_code: courseCode} : {}; //eslint-disable-line
    const res = await httpAxios.get("courses", { params });
    console.debug("GET: " + res.config.baseURL + "/" + res.config.url);
    if (res.status === 200) {
      if (res.data.length === 1) {
        return res.data.map(dto => morphism(courseFromDto, dto));
      } else {
        throwApiError(
          "Should be only one object, received: " + res.data.length
        );
      }
    } else {
      throwApiError(res.statusText);
    }
  }
};

/* gets meta data for a course.
The concept is that we load details such as student count,
modules and other interesting meta data.
WARN: not implemnted */
/*async getCourseDetails(course: Course) {
  console.debug(
    "courseService->getCourseDetails() WARN: not implemented."
  );*/
/*    const params = courseCode ? {course_code: courseCode} : {}; //eslint-disable-line
try {
  const res = await httpAxios.get("courses", {params});
  console.debug("GET request to: " + res.config.baseURL + "/" + res.config.url);
  return this.courseObjectMapper(res.data);
} catch (error) {
  console.error(error);
}*/
