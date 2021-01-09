/*
EA & SOA Group 2 HT2020

This is the http request client for working with the app middleware.

Rewrite rules are depending on production and development and may be set by webpack or nginx servers.
 */

import axios from "axios";
import {AxiosError} from "@/service/errors";

const baseUrl = process.env.VUE_APP_BASE_URL + process.env.VUE_APP_API_PATH; // from .env file or shell
console.debug("Axios baseURL: " + baseUrl);
const instance = axios.create({
  baseURL: baseUrl,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

// Add a request interceptor.
// https://auralinna.blog/post/2019/global-http-request-and-response-handling-with-the-axios-interceptor/
instance.interceptors.request.use(
  function(config) {
    return config;
  },
  function(error) {
    return Promise.reject(new AxiosError("Request was rejected"));
  }
);

export default instance;

/*
const httpAxios = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 3000,
  headers: { "X-Custom-Header": "foobar" }
});
*/
