import myAxios from "@/service/myAxios";

export default {
  async getModules() {
    try {
      const res = await myAxios.get("results");
      console.log("GET request to: " + res.config.baseURL + res.config.url);
      return res;
    } catch (error) {
      console.error(error);
    }
  },
  async getAssignments(examinationCode: string) {
    try {
      const res = await myAxios.get("app/V1/examination/"+examinationCode);
      console.log("GET request to: " + res.config.baseURL + res.config.url);
      return res;
    } catch (error) {
      console.error(error);
    }
  }
}
