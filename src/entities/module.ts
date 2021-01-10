/* eslint-disable */
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
