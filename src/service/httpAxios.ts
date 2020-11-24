import axios from "axios";
/*
export default {
  myAxios: (a: AxiosInstance) => {
    return axios.create({
      baseURL: `http://api.pearson.com/v2/dictionaries`,
      withCredentials: false,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }
}
*/

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL + "/appmw", // se rewrite rule in vue.config.js
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default instance;
