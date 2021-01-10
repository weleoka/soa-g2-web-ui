/*
EA & SOA Group 2 HT2020

Business logic concerning the workings with courses over API's.
 */
import { morphism } from "morphism";
import requests from "@/service/requests";
import { MappingError } from "@/service/errors";
import { Schedule, scheduleFromDto } from "@/entities/schedule";
import { Occasion } from "@/entities/occasion";

const apiCall = `schedules`;

export default {
  /* get a list of schedules */
  async getScheduleList() {
    console.debug(`scheduleService->getScheduleList()`);
    const res = await requests.getMany(apiCall);
    return this.mapper(res);
  },

  /* Find schedule by occasion using url param */
  async getScheduleByOccasion(occasion: Occasion): Promise<Schedule> {
    console.debug(`scheduleService->getScheduleByOccasion(): ${occasion.id}`);
    const params = {occasion_code: occasion.id} //eslint-disable-line
    const res = await requests.getMany(apiCall, params);
    return this.mapper(res)[0];
  },

  /* Find schedule by occasion using path variable
   * A temporary method due to backend design choices. */
  async getScheduleByOccasionUsingPathVar(
    occasion: Occasion
  ): Promise<Schedule> {
    console.debug(
      `scheduleService->getScheduleByOccasionUsingPathVar(): ${occasion.id}`
    );
    const res = await requests.getSingle(`schedules/${occasion.id}`);
    try {
      return this.singleMapper(res);
    } catch (e) {
      if (e.name === "MappingError") {
        console.warn("Bad object for mapping to Schedule");
      } else {
        throw Error(e);
      }
    }
  },

  /* mapping from array of dto to domain objects */
  mapper(dtoArr: []) {
    try {
      return dtoArr.map(dto => morphism(scheduleFromDto, dto, Schedule));
    } catch (e) {
      throw new MappingError(`Bad JSON array: ${dtoArr}`);
    }
  },

  /* mapping from single dto to domain object */
  singleMapper(dto) {
    try {
      const schedule = morphism(scheduleFromDto, dto, Schedule);
      return schedule;
    } catch (e) {
      throw new MappingError(`Bad dto: ${dto}`);
    }
  }
};
