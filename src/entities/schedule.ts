import { morphism } from "morphism";
import { Event, eventFromDto } from "@/entities/event";

/* eslint-disable */

export interface ScheduleI {
  id: string;
  occasionCode: string;
  events: [];
}
export class Schedule implements ScheduleI {
  id: string;
  occasionCode: string;
  events: [];
  /* imposed by backend */
  courseId: number;
  courseOccasionId: number;
  timeEditObjectId: number;
  courseCode: string;
  /* testing */
  events2: [];
}
export const scheduleToDto = {
  schedule_code: "id",
  occasion_code: "occasionCode"
};
export const scheduleFromDto = {
  id: "schedule_code",
  occasionCode: "occasion_code",
  courseCode: "course_code",
  courseId: "course_id",
  occasionId: "course_occasion_id",
  timeEditObjectId: "time_edit_object_id",
  /* The following is two ways of doing the same thing with morphism */
  events: {
    path: "reservations",
    fn: (dtoArr, source) => { // dtoArr is arr of reservations.
      return dtoArr.map(dto => morphism(eventFromDto, dto, Event));
    }
  },
  events2: (rObj, source, destination) => { // response object = rObj
    return rObj.reservations.map(nestedDto => morphism(eventFromDto, nestedDto, Event))
  },
};
