/* eslint-disable */
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
