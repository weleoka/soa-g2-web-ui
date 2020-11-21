import myAxios from "@/service/myAxios";

export default {
  async getAllModules() {
    try {
      const res = await myAxios.get("modules");
      console.log("GET request to: " + res.config.baseURL + res.config.url);
      return res.data;
    } catch (error) {
      console.error(error.message);
    }
  },
  async getModulesByCourseCode(courseCode: string) {
    try {
      const res = await myAxios.get("modules", {
        params: {
          "course_code": courseCode
        }
      });
      console.log("GET request to: " + res.config.baseURL + res.config.url);
      return res.data;
    } catch (error) {
      console.error(error.message);
    }
  }
}

