/*
EA & SOA Group 2 HT2020

Business logic concerning the workings with courses over API's.
 */
import myAxios from "@/service/myAxios";
import { dtoToCourse } from "@/service/types";
import { objectMapper } from "object-mapper";

export default {
  /* get a list of available courses */
  async getCourses() {
    console.debug("getCourseList()");
    try {
      const res = await myAxios.get("courses");
      console.debug("GET: " + res.config.baseURL + "/" + res.config.url);
      return await res.data.forEach(dto => objectMapper(dto, dtoToCourse)); // this.courseObjectMapper(res.data);
    } catch (error) {
      console.error(error);
    }
  }
};

/* gets meta data for a course.
The concept is that we load details such as student count,
modules and other interesting meta data.
WARN: not implemnted */
/*async getCourseDetails(course: Course) {
  console.debug(
    "courseApiService->getCourseDetails() WARN: not implemented."
  );*/
/*    const params = courseCode ? {course_code: courseCode} : {}; //eslint-disable-line
try {
  const res = await myAxios.get("courses", {params});
  console.debug("GET request to: " + res.config.baseURL + "/" + res.config.url);
  return this.courseObjectMapper(res.data);
} catch (error) {
  console.error(error);
}*/
