/*
EA & SOA Group 2 HT2020
Interfaces, classes implementing these and also Object mappings are all found here.
todo: implement - const toDto = fromDto.map((key, value) => value, key) to flip the to and from Dto const
*/

/* eslint-disable */
import {morphism} from "morphism";

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
  constructor(id?: string) {
    this.id = id ? id : null;
  }
  courseCode: string;
  id: string;
  locationCode: string;
  parallelOccasions: [];
  periodCode: string;
  studentCount: number;
  studyRate: string;
  /* course-service imposed extensions*/
  location: string;
  year: string;
  timeEditObjectId: string;
  periods: [];
  teachers: [];
}
/*export const occasionToDto = {
  occasion_code: "id",
  period_code: "periodCode",
  course_code: "courseCode",
  location_code: "locationCode",
  parallel_occasions: "parallelOccasions",
  student_count: "studentCount",
  study_rate: "studyRate"
};
export const occasionFromDto = {
  id: "occasion_code",
  periodCode: "period_code",
  courseCode: "course_code",
  locationCode: "location_code",
  parallelOccasions: "parallel_occasions",
  studentCount: "student_count",
  studyRate: "study_rate"
};*/
/* Course-service DTO */
export const occasionFromDto = {
  id: "course_occasion_id",
  courseCode: "course_code",
  locationCode: "location",
  year: "year",
  timeEditObjectId: "time_edit_object_id",
  periods: "periods",
  teachers: "teachers",
};


/* === COURSE === */
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
  //occasions: "course_instances", // todo: work here!
  /*  occasions: {
      path: 'bar',
      fn: dto => morphism(occasionFromDto, dto, Occasion)
    }*/
  /*occasions: iteratee => iteratee.course_instances.map(
      dto => morphism(occasionFromDto, dto, Occasion)
  )*/
};
/*export function courseServiceCourseMapper(dto) {
}*/


/* === SCHEDULE === */
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
/*export const scheduleFromDto = {
  id: "schedule_code",
  occasionCode: "occasion_code",
};*/
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


/* === MODULE === */
interface ModuleI {
  id: string;
  courseCode: string;
  description: string;
  status: string;
}
export class Module implements ModuleI {
  id: string;
  courseCode: string;
  description: string;
  status: string;
}
export const moduleFromDto = {
  id: "module_id",
  courseCode: "course_code",
  description: "description",
  status: "status"
}


/* === EVENT === aka. reservation in backend */
export interface EventI {
  id: string;
  title: string;
  scheduleCode: string; // schedule uuid
  datetime: Date; // javascript Date object (were only interested in DAY of the year really)
  timeslot: number; // 1 through 5 (this is lektionspass)
  rooms: [];
  equipment: [];
  teachers: [];
}
export class Event implements EventI {
  constructor(datetime: Date) {
    this.datetime = datetime;
  }
  datetime: Date;
  equipment: [];
  id: string;
  rooms: [];
  scheduleCode: string;
  teachers: [];
  timeslot: number;
  title: string;
  /* imposed by backend */
  location: string;
  userId: number;
  contactName: string;
  distanceUrl: string;
  eventUrl: string;
  description: string;
  startTime: Date;
  endTime: Date;
  session: string;
}
export const eventFromDto = {
  id: "event_code",
  title: "title",
  scheduleCode: "schedule_code",
  datetime: "datetime",
  timeslot: "timeslot",
  rooms: "rooms",
  equipment: "equipment",
  teachers: "teachers",
  /* imposed by backend */
  location: "location",
  userId: "user_id",
  contactName: "contact_name",
  distanceUrl: "distance_url",
  eventUrl: "event_url",
  description: "description",
  startTime: "start_time",
  endTime: "end_time",
  session: "session"
};
export const eventToDto = {
  event_code: "id",
  title: "title",
  schedule_code: "scheduleCode",
  datetime: "datetime",
  timeslot: "timeslot",
  rooms: "rooms",
  equipment: "equipment",
  teachers: "teachers",
  /* imposed by backend */
  location: "location",
  user_id: "userId",
  contact_name: "contactName",
  distance_url: "distanceUrl",
  event_url: "eventUrl",
  description: "description",
  start_time: "startTime",
  end_time: "endTime",
  session: "session"
};


/* === SUBMISSION === */
export interface SubmissionI {
  id: string;
  examination: string;
  studentId: string;
  firstName: string;
  lastName: string;
  teacherId: string;
  createdAt: string;
  moduleCode: string;
  grade: string;
  verified: boolean;
}
export class Submission implements SubmissionI {
  id: string;
  examination: string;
  studentId: string;
  firstName: string;
  lastName: string;
  teacherId: string;
  createdAt: string;
  moduleCode: string;
  grade: string;
  verified: boolean;
}
export const submissionFromDto = {
  id: "submission_id",
  examination: "examination",
  studentId: "student_id",
  firstName: "first_name",
  lastName: "last_name",
  teacherId: "teacher_id",
  createdAt: "created_at",
  moduleCode: "module_code",
  grade: "grade",
  verified: "verified"
}


/* === ASSIGNMENT === */
// not implemented
