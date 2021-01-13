/*
EA & SOA Group 2 HT2020

Business logic concerning the workings with course occasions.
 */
import requests from "@/service/requests";
import { Occasion, occasionFromDto } from "@/entities/occasion";
import { ApiTools } from "@/service/utils";

const apiCall = `occasions`;

export default {
  /* Get occasions by course id*/
  async getOccasionsByCourseId(courseId: string) {
    console.debug(`occasionService->getOccasionsByCourseId() ${courseId}`);
    const params = {course_code: courseId}; //eslint-disable-line
    const res = await requests.getMany(apiCall, params);
    return ApiTools.mapper(occasionFromDto, res, Occasion);
  },

  /* Get all occasions */
  async getAllOccasions() {
    console.debug(`occasionService->getAllOccasions()`);
    const res = await requests.getMany(apiCall);
    return ApiTools.mapper(occasionFromDto, res, Occasion);
  }
};
