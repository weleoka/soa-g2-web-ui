/*
EA & SOA Group 2 HT2020
Interfaces, classes implementing these and also Object mappings are all found here.
todo: implement - const toDto = fromDto.map((key, value) => value, key) to flip the to and from Dto const
*/

/* eslint-disable */

/* === OCCASION === */
export interface OccasionI {
  id: string;
  periodCode: string;
  courseCode: string;
  locationCode: string;
  parallelOccasions: [];
  studentCount: number;
  studyRate: string;
}
export class Occasion implements OccasionI {
  constructor(id: string) {
    this.id = id;
  }
  courseCode: string;
  id: string;
  locationCode: string;
  parallelOccasions: [];
  periodCode: string;
  studentCount: number;
  studyRate: string;
}
export const dtoToOccasion = {
  occasion_code: "id",
  period_code: "periodCode",
  course_code: "courseCode",
  location_code: "locationCode",
  parallel_occasions: "parallelOccasions",
  student_count: "studentCount",
  study_rate: "studyRate"
};
export const occasionToDto = {
  id: "occasion_code",
  periodCode: "period_code",
  courseCode: "course_code",
  locationCode: "location_code",
  parallelOccasions: "parallel_occasions",
  studentCount: "student_count",
  studyRate: "study_rate"
};

/* === COURSE === */
export interface CourseI {
  id: string; // courseCode
  admin: string; // the kursansvarig
  nameSe: string; // name swedish
  nameEn: string; // name english
  status: string;
}
export class Course implements CourseI {
  admin: string;
  id: string;
  nameEn: string;
  nameSe: string;
  status: string;
}
export const courseToDto = {
  course_code: "id",
  course_admin: "admin",
  name_se: "nameSe",
  name_en: "nameEn",
  status: "status"
};
export const dtoToCourse = {
  id: "course_code",
  admin: "course_admin",
  nameSe: "name_se",
  nameEn: "name_en",
  status: "status"
};

/* === SCHEDULE === */
export interface ScheduleI {
  id: string;
  occasionCode: string;
}
export class Schedule implements ScheduleI {
  id: string;
  occasionCode: string;
}
export const scheduleToDto = {
  id: "id",
  occasion_code: "occasionCode"
};
export const dtoToSchedule = {
  id: "id",
  occasionCode: "occasion_code"
};

/* === EVENT === */
export interface EventI {
  id: string;
  title: string;
  scheduleCode: string; // schedule uuid
  datetime: Date; // javascript Date object
  timeslot: number; // 1 through 5 (lektionspass)
  rooms: [];
  equipment: [];
  teachers: [];
}
export class Event implements EventI {
  datetime: Date;
  equipment: [];
  id: string;
  rooms: [];
  scheduleCode: string;
  teachers: [];
  timeslot: number;
  title: string;
}
export const dtoToEvent = {
  id: "id", //maybe EventCode
  title: "title",
  scheduleCode: "schedule_code",
  datetime: "datetime",
  timeslot: "timeslot",
  rooms: "rooms",
  equipment: "equipment",
  teachers: "teachers"
};
export const eventToDto = {
  id: "id",
  title: "title",
  schedule_code: "scheduleCode",
  datetime: "datetime",
  timeslot: "timeslot",
  rooms: "rooms",
  equipment: "equipment",
  teachers: "teachers"
};
