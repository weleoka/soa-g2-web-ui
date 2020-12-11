/*
EA & SOA Group 2 HT2020

Business logic concerning the workings with course occasions.
 */

import myAxios from "@/service/myAxios";

interface OccasionObj {
  id: string;
  periodCode: string;
  courseCode: string;
  locationCode: string;
}

export default {
  async getOccasions() {
    try {
      const res = await myAxios.get("occasions");
      console.log(
        "GET request to: " + res.config.baseURL + "/" + res.config.url
      );
      return this.occasionObjectMapper(res.data);
    } catch (error) {
      console.error(error);
    }
  },

  async getOccasionsByCourseCode(moduleCode: string) {
    try {
      const res = await myAxios.get("occasions", {
        params: {
          module_code: moduleCode  //eslint-disable-line
        }
      });
      console.log(
        "GET request to: " + res.config.baseURL + "/" + res.config.url
      );
      return this.occasionObjectMapper(res.data);
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
      console.log(
        "GET request to: " + res.config.baseURL + "/" + res.config.url
      );
      return this.occasionObjectMapper(res.data);
    } catch (error) {
      console.error(error);
    }
  },

  // Maps the API provided object to the application domain object.
  occasionObjectMapper(occasionArr: any[]) {
    console.log("Mapping Occasions objects: " + occasionArr.length);
    const arr = [];
    for (let i = 0; i < occasionArr.length; i++) {
      const occasionObj: OccasionObj = {
        id: occasionArr[i].occasion_code,
        periodCode: occasionArr[i].period_code,
        courseCode: occasionArr[i].course_code,
        locationCode: occasionArr[i].location_code
      };
      arr.push(occasionObj);
    }
    return arr;
  }
};
