import { morphism } from "morphism";
import { eventFromDto } from "@/entities/event";

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
    fn: (reservations, source) => {
      return reservations.map(reservationDto => morphism(eventFromDto, reservationDto, Event));
    }
  },
  events2: (iteratee, source, destination) => {
    return iteratee.reservations.map(nestedDto => morphism(eventFromDto, nestedDto, Event))
  },
};
