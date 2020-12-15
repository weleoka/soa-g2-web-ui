/*
EA & SOA Group 2 HT2020

Business logic concerning the workings with courses over API's.
 */
import myAxios from "@/service/myAxios";

interface CourseObj {
  // todo: use dedicated object, or just more or less enhanced object for details passing?
  id: string;
  description: string;
  status: string;
}

export default {
  /* get a list of available course codes */
  async getCourseCodeList() {
    console.debug("getCourseCodeList()");
    try {
      const res = await myAxios.get("courses");
      console.debug(
        "GET request to: " + res.config.baseURL + "/" + res.config.url
      );
      return this.courseObjectMapper(res.data);
    } catch (error) {
      console.error(error);
    }
  },

  /* gets meta data for a course.
  The concept is that we load details such as student count,
  modules and other interesting meta data.
  WARN: not implemnted */
  async getCourseDetails(courseCode: string) {
    console.debug(
      "courseApiService->getCourseDetails() WARN: not implemented."
    );
    /*    const params = courseCode ? {course_code: courseCode} : {}; //eslint-disable-line
    try {
      const res = await myAxios.get("courses", {params});
      console.debug("GET request to: " + res.config.baseURL + "/" + res.config.url);
      return this.courseObjectMapper(res.data);
    } catch (error) {
      console.error(error);
    }*/
  },

  /* Object mapper DTO to application */
  courseObjectMapper(courseArr: any[]) {
    console.debug("Mapping Course objects: " + courseArr.length);
    const arr = [];
    for (let i = 0; i < courseArr.length; i++) {
      const courseObj: CourseObj = {
        id: courseArr[i].course_code,
        description: courseArr[i].description,
        status: courseArr[i].status
      };
      arr.push(courseObj);
    }
    return arr;
  }
};
