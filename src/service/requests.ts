/*
EA & SOA Group 2 HT2020

API requests wrapper for error handling and feedback.
 */
import httpAxios from "@/service/httpAxios";
import { ApiError, ApiResponseError } from "@/service/errors";

export default {
  /* run a get */
  async getMany(apiCall, params?) {
    let res = null;
    try {
      res = await httpAxios.get(apiCall, { params: params });
      console.debug(`GET: ${res.config.baseURL}/${res.config.url}`);
    } catch (e) {
      throw new ApiError(e.message);
    }
    if (res.status === 200) {
      if (res.data.length) {
        return res.data;
      } else if (res.data && Object.keys(res.data).length) {
        throw new ApiResponseError(res, `Expected array, got object`);
      }
    } else {
      throw new ApiResponseError(res, "Not OK");
    }
  },

  /* run a get expecting single object response */
  async getSingle(apiCall, params?) {
    let res = null;
    try {
      res = await httpAxios.get(apiCall, { params: params });
      console.debug(`GET: ${res.config.baseURL}/${res.config.url}`);
    } catch (e) {
      throw new ApiError(e.message);
    }
    if (res.status === 200) {
      if (res.data.length) {
        throw new ApiResponseError(res, "Expected object, got array");
      } else {
        return res.data;
      }
    } else {
      throw new ApiResponseError(res, "Not OK");
    }
  },

  /* run a post expecting single object response */
  async postRequest(apiCall, data) {
    let res = null;
    try {
      res = await httpAxios.post(apiCall, data);
      console.debug(`POST: ${res.config.baseURL}/${res.config.url}`);
    } catch (e) {
      throw new ApiError(e.message);
    }
    if (res.status === 200) {
      if (res.data.length) {
        throw new ApiResponseError(res, "Expected object, got array");
      } else {
        return res.data;
      }
    } else {
      throw new ApiResponseError(res, "Not OK");
    }
  }
};

/* A wrapper for POST requests, with optional data. */
// async postRequest(apiCall, data?) {
//try {
//   return await this.executePost(apiCall, data).catch(err => new Error(err));
/*    } catch (e) {
      if (e.name === "ApiError") {
        console.warn(`ApiError ${e.message}`);
        return [];
      } else if (e.name === "ApiResponseError") {
        console.warn(`ApiResponseError: ${e.message}`);
        return [];
      } else {
        throw Error(e);
      }
    }*/
//},

/* A wrapper for GET requests, with optional URL params. */
//async getMany(apiCall, params?) {
//    return await this.executeGet(apiCall, params).catch(err => new Error(err));
/*
    if (e.name === "ApiError") {
      console.warn(`ApiError ${e.message}`);
    } else if (e.name === "ApiResponseError") {
      console.warn(`ApiResponseError: ${e.message}`);
    } else {
      throw Error(e);
    }
  }*/
//},
