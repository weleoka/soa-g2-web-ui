import httpAxios from "@/service/httpAxios";

export default {
/*  async getResults() {
    try {
      const res = await httpAxios.get("/results");
      console.log("GET request to: " + res.config.baseURL + res.config.url);
      return res;
    } catch (error) {
      console.error(error);
    }
  },*/
  async getAssignments(examinationCode: string) {
    console.log("Called resultsApiService->getAssignments() with examinationcode: " + examinationCode);
    try {
      const res = await httpAxios.get("/examination/"+examinationCode);
      console.log("GET request to: " + res.config.baseURL + res.config.url);
      return res;
    } catch (error) {
      console.error(error);
    }
  }
}
