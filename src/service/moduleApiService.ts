import myAxios from "@/service/myAxios";

export default {
  async getModules() {
    try {
      const res = await myAxios.get("modules");
      console.log("GET request to: " + res.config.baseURL + res.config.url);
      return res;
    } catch (error) {
      console.error(error);
    }
  }
}
