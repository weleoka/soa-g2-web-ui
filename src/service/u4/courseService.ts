/*
EA & SOA Group 2 HT2020

Business logic concerning the workings with courses over API's.
 */
import requests from "@/service/requests";
import { Course, courseFromDto } from "@/entities/course";
import { ApiTools } from "@/service/utils";

const apiCall = `courses`;

export default {
  /* get a list of all courses */
  async getAllCourses() {
    console.debug(`courseService->getAllCourses()`);
    const res = await requests.getMany(apiCall);
    return ApiTools.mapper(courseFromDto, res, Course);
  },

  /* Find a course in API by courseId */
  async getCourseByCourseId(courseId: string) {
    console.debug(`courseService->getCourseByCourseId(): ${courseId}`);
    //const params = {course_code: courseId}; //eslint-disable-line
    const res = await requests.getSingle(`${apiCall}/${courseId}`);
    return ApiTools.singleMapper(courseFromDto, res, Course);
  }
};
