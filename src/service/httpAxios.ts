/*
EA & SOA Group 2 HT2020

This is the http request client for working with the app middleware.

Rewrite rules are depending on production and development and may be set by webpack or nginx servers.
 */

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
