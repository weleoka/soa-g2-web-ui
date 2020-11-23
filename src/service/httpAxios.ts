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
  //baseURL: `http://localhost:8080/api/`,
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default instance;
