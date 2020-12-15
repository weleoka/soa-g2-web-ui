/*
EA & SOA Group 2 HT2020

This deals with runtime state across the whole app.
Often this is where we would use local storage db and
save state to a db on the client.
 */

import myAxios from "@/service/myAxios";

interface ModuleObj {
  id: string;
  courseCode: string;
  description: string;
  status: string;
}

export default {
  // Get modules by course code or get all modules
  async getModulesByCourseCode(courseCode: string) {
    const params = courseCode ? {course_code: courseCode} : {}; //eslint-disable-line
    try {
      const res = await myAxios.get("/modules", { params });
      console.debug("GET request to: " + res.config.baseURL + res.config.url);
      return this.moduleObjectMapper(res.data);
    } catch (error) {
      console.error(error.message);
    }
  },

  // Get all the details about a module.
  async getModuleDetails() {
    // WARN: not implemented.
    try {
      const res = await myAxios.get("/modules");
      console.debug("GET request to: " + res.config.baseURL + res.config.url);
      return this.moduleObjectMapper(res.data);
    } catch (error) {
      console.error(error.message);
    }
  },

  // Object mapper DTO to application
  moduleObjectMapper(moduleArr: any[]) {
    console.debug("Mapping Module objects: " + moduleArr.length);
    const arr = [];
    for (let i = 0; i < moduleArr.length; i++) {
      const moduleObj: ModuleObj = {
        id: moduleArr[i].module_id,
        courseCode: moduleArr[i].course_code,
        description: moduleArr[i].description,
        status: moduleArr[i].status
      };
      arr.push(moduleObj);
    }
    return arr;
  }
};
