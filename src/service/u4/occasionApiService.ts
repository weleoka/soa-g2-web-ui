/*
EA & SOA Group 2 HT2020

Business logic concerning the workings with course occasions.
 */

import myAxios from "@/service/myAxios";

interface OccasionMetadata {
  // todo: find out how to provide defaults to interfaces.
  nestedInfo: string;
}

export interface OccasionObj {
  id: string;
  periodCode: string;
  courseCode: string;
  locationCode: string;
  metadata: OccasionMetadata;
}

export default {
  /* Gets occasions by course code, or all if no course code specified */
  async getOccasionsByCourseCode(courseCode: string) {
    const params = courseCode ? {course_code: courseCode} : {}; //eslint-disable-line
    try {
      const res = await myAxios.get("occasions", { params });
      console.debug(
        "GET request to: " + res.config.baseURL + "/" + res.config.url
      );
      return this.occasionObjectMapper(res.data);
    } catch (error) {
      console.error(error);
    }
  },

  /* Gets a single occasion */
  async getOccasion(occasionCode: string) {
    const params = occasionCode ? {occasion_code: occasionCode} : {}; //eslint-disable-line
    try {
      const res = await myAxios.get("occasions", { params });
      console.debug(
        "GET request to: " + res.config.baseURL + "/" + res.config.url
      );
      if (res.data.length === 1) {
        return this.occasionObjectMapper(res.data)[0];
      } else {
        console.warn("API error, invalid number of occasions returned!");
      }
    } catch (error) {
      console.error(error);
    }
  },

  /* gets metadata for an occasion object */
  async getOccasionDetails(occasion: OccasionObj) {
    console.log("occasionApiService->getOccasionDetails() NOT implemented.");
    // call api's and get useful info to fill out metadata of object!
    occasion.metadata.nestedInfo = "Hello!";
    return occasion;
  },

  /* Object mapper DTO to application */
  occasionObjectMapper(occasionArr: any[]) {
    console.debug("Mapping Occasions objects: " + occasionArr.length);
    const arr = [];
    for (let i = 0; i < occasionArr.length; i++) {
      const occasionObj: OccasionObj = {
        id: occasionArr[i].occasion_code,
        periodCode: occasionArr[i].period_code,
        courseCode: occasionArr[i].course_code,
        locationCode: occasionArr[i].location_code,
        metadata: {
          nestedInfo: ""
        }
      };
      arr.push(occasionObj);
    }
    return arr;
  }
};
