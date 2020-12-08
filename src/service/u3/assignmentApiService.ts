/*
EA & SOA Group 2 HT2020

This deals with runtime state across the whole app.
Often this is where we would use local storage db and
save state to a db on the client.
 */

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
