/*
EA & SOA Group 2 HT2020

Business logic concerning the workings with course occasions.
 */
import requests from "@/service/requests";
import { morphism } from "morphism";
import { ApiError } from "@/service/errors";
import { Occasion, occasionFromDto } from "@/entities/occasion";

const apiCall = `occasions`;

export default {
  /* Gets occasions by course id*/
  async getOccasionsByCourseId(courseId: string) {
    console.debug(`occasionService->getOccasionsByCourseId() ${courseId}`);
    const params = {course_code: courseId}; //eslint-disable-line
    const res = await requests.getMany(apiCall, params);
    return this.mapper(res);
  },

  /* get all occasions */
  async getAllOccasions() {
    console.debug(`occasionService->getAllOccasions()`);
    const res = await requests.getMany(apiCall);
    return this.mapper(res);
  },

  /* mapping from dto to domain objects */
  mapper(res) {
    try {
      return res.map(dto => morphism(occasionFromDto, dto, Occasion));
    } catch (e) {
      return new ApiError(`Bad data: ${res}`);
    }
  }
};
