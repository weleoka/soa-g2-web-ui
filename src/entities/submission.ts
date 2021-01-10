/* eslint-disable */
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
