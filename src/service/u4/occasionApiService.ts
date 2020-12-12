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
  // Gets occasions by course code, or all if no course code specified
  async getOccasionsByCourseCode(courseCode: string) {
    const params = courseCode ? {course_code: courseCode} : {}; //eslint-disable-line
    try {
      const res = await myAxios.get("occasions", {params});
      console.debug("GET request to: " + res.config.baseURL + "/" + res.config.url);
      return this.occasionObjectMapper(res.data);
    } catch (error) {
      console.error(error);
    }
  },

  // Gets all the details about an occasion WARN: not implemented.
  async getOccasionDetails(occasionCode: string) {
    console.log("getOccasionDetails not implemented.")
    const params = occasionCode ? {occasion_code: occasionCode} : {}; //eslint-disable-line
    try {
      const res = await myAxios.get("occasions", {params});
      console.debug("GET request to: " + res.config.baseURL + "/" + res.config.url);
      return this.occasionObjectMapper(res.data);
    } catch (error) {
      console.error(error);
    }
  },

  // Object mapper DTO to application
  occasionObjectMapper(occasionArr: any[]) {
    console.debug("Mapping Occasions objects: " + occasionArr.length);
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
