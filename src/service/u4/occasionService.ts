/*
EA & SOA Group 2 HT2020

Business logic concerning the workings with course occasions.
 */

import myAxios from "@/service/myAxios";

export default {
  async getOccasions() {
    try {
      const res = await myAxios.get("occasions");
      console.log("GET request to: " + res.config.baseURL + res.config.url);
      return res;
    } catch (error) {
      console.error(error);
    }
  },

  async getOccasionsByModuleCode(moduleCode: string) {
    try {
      const res = await myAxios.get("occasions",  {
        params: {
          module_code: moduleCode  //eslint-disable-line
        }});
      console.log("GET request to: " + res.config.baseURL + res.config.url);
      return res;
    } catch (error) {
      console.error(error);
    }
  },


  async getOccasionDetails(occasionCode: string) {
    try {
      const res = await myAxios.get("occasions", {
        params: {
          occasion_code: occasionCode  //eslint-disable-line
        }
      });
      console.log("GET request to: " + res.config.baseURL + res.config.url);
      return res;
    } catch (error) {
      console.error(error);
    }
  }
};
