import myAxios from "@/service/myAxios";

interface ModuleObj {
  id: string;
  courseCode: string;
  description: string;
  status: string;
}

export default {
  async getAllModules() {
    try {
      const res = await myAxios.get("/modules");
      console.log(
        "GET request to: " + res.config.baseURL + "/" + res.config.url
      );
      return this.moduleObjectMapper(res.data);
    } catch (error) {
      console.error(error.message);
    }
  },
  async getModulesByCourseCode(courseCode: string) {
    try {
      const res = await myAxios.get("/modules", {
        params: {
          course_code: courseCode  //eslint-disable-line
        }
      });
      console.log("GET request to: " + res.config.baseURL + res.config.url);
      return this.moduleObjectMapper(res.data);
    } catch (error) {
      console.error(error.message);
    }
  },
  async getModuleDetails() {
    // WARN: not implemented.
    try {
      const res = await myAxios.get("/modules");
      console.log("GET request to: " + res.config.baseURL + res.config.url);
      return this.moduleObjectMapper(res.data);
    } catch (error) {
      console.error(error.message);
    }
  },

  // Maps the API provided object to the application domain object.
  moduleObjectMapper(moduleArr: string | any[]) {
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
