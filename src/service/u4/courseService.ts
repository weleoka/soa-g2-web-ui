/*
EA & SOA Group 2 HT2020

Business logic concerning the workings with courses over API's.
 */
import requests from "@/service/requests";
import { morphism } from "morphism";
import { Course, courseFromDto } from "@/entities/course";
import { ApiError } from "@/service/errors";

const apiCall = `courses`;

export default {
  /* get a list of all courses */
  async getAllCourses() {
    console.debug(`courseService->getAllCourses()`);
    const res = await requests.getMany(apiCall);
    return this.mapper(res);
  },

  // todo: probably make it GET to endpoint as: /courses/{courseId}
  /* Find a course in API by courseId */
  async getCourseByCourseId(courseId: string) {
    console.debug(`courseService->getCourseByCourseId(): ${courseId}`);
    const params = {course_code: courseId}; //eslint-disable-line
    const res = await requests.getMany(apiCall, params); //.catch(err => new Error(err));
    return this.mapper(res);
  },

  /* mapping from dto to domain objects */
  mapper(res) {
    try {
      return res.map(dto => morphism(courseFromDto, dto, Course));
    } catch (e) {
      return new ApiError(`Bad data: ${res}`);
    }
  }
};
