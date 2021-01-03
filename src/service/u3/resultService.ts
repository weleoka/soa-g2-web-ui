/*
EA & SOA Group 2 HT2020
*/

import httpAxios from "@/service/httpAxios";
import { throwApiError, throwApiResponseError } from "@/service/errors";
import { morphism } from "morphism";
import { Submission, submissionFromDto } from "@/service/types";

export default {
  /* get submissions by module id */
  async getSubmissionsByAssignment(moduleId: string) {
    console.debug(`resultService->getSubmissionsByAssignment(): ${moduleId}`);
    const apiCall = `/examination/${moduleId}`;
    const data = {};
    try {
      const res = await httpAxios.get(apiCall, data);
      console.debug(`GET: ${res.config.baseURL}/${res.config.url}`);
      if (res.status === 200) {
        if (res.data.length) {
          return res.data.map(dto =>
            morphism(submissionFromDto, dto, Submission)
          );
        }
        return [];
      } else {
        throwApiResponseError(res);
        return [];
      }
    } catch (error) {
      throwApiError(error.message);
      return [];
    }
  },

  /* set verified status on a grade. */
  async submitGradeVerification(submissionId: string) {
    console.debug(`resultService->submitGradeVerification(): ${submissionId}`);
    const apiCall = `/submission/${submissionId}/verify`;
    const data = {submission_id: submissionId}; //eslint-disable-line
    try {
      const res = await httpAxios.post(apiCall, data);
      console.debug(`POST: ${res.config.baseURL}/${res.config.url}`);
      if (res.status === 200) {
        if (res.data.length) {
          return res.data; // not certain what data to return
        }
        return [];
      } else {
        throwApiResponseError(res);
        return [];
      }
    } catch (error) {
      throwApiError(error.message);
      return [];
    }
  }

  /* Test call mock services for results objects */
  /*async getResults() {
    try {
      const res = await httpAxios.get("/results");
      console.log("GET request to: " + res.config.baseURL + res.config.url);
      return res;
    } catch (error) {
      console.error(error);
    }
  },*/
};
