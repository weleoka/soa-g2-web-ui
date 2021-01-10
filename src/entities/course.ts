import { morphism } from "morphism";
import { Occasion } from "@/entities/occasion";
import { eventFromDto } from "@/entities/event";

/* eslint-disable */

export interface CourseI {
  id: string; // courseCode
  admin: string; // the kursansvarig
  nameSe: string; // name swedish
  nameEn: string; // name english
  status: string;
  ects: string;
  occasions: [];
}
export class Course implements CourseI {
  id: string;
  admin: string;
  nameEn: string;
  nameSe: string;
  status: string;
  /* imposed by backend */
  ects: string;
  occasions: [];
}
export const courseToDto = {
  course_code: "id",
  course_admin: "admin",
  name_se: "nameSe",
  name_en: "nameEn",
  status: "status"
};
export const courseFromDto = {
  id: "course_code",
  admin: "course_admin",
  //nameSe: "name_se",
  nameEn: "name_en",
  status: "status",
  /* imposed by backend */
  nameSe: "name",
  ects: "ects",
  occasions: {
    path: "course_instances",
    fn: (dtoArr, source) => {
      return dtoArr.map(dto => morphism(eventFromDto, dto, Occasion));
    }
  },
};
