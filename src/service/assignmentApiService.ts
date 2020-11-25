import myAxios from "@/service/myAxios";
/*
This deals with communications to and from SubmissionService
 */
export default {
  async getAssignments() {
    try {
      const res = await myAxios.get("assignments");
      console.log("GET request to: " + res.config.baseURL + res.config.url);
      return res;
    } catch (error) {
      console.error(error);
    }
  },
  async getAssignmentsByModuleId(moduleId: string) {
    try {
      const res = await myAxios.get("assignments", {
        params: {
          module_id: moduleId  //eslint-disable-line
        }
      });
      console.log("GET request to: " + res.config.baseURL + res.config.url);
      return res;
    } catch (error) {
      console.error(error);
    }
  }
};
