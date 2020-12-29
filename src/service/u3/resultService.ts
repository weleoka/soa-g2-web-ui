/*
EA & SOA Group 2 HT2020

This deals with runtime state across the whole app.
Often this is where we would use local storage db and
save state to a db on the client.
 */

import httpAxios from "@/service/httpAxios";
import {throwApiError} from "@/service/errors";
import {morphism} from "morphism";
import {scheduleFromDto, submissionFromDto} from "@/service/types";

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
  async getSubmissionsByAssignment(examinationCode: string) {
    console.log(
      "Called resultService->getAssignments() with examinationcode: " +
        examinationCode
    );
    try {
      const res = await httpAxios.get("/examination/" + examinationCode);
      console.log("GET request to: " + res.config.baseURL + res.config.url);
      if (res.status === 200) {
        return res.data.map(dto => morphism(submissionFromDto, dto));
      } else {
        throwApiError("Response: " + res.status);
      }
    } catch (error) {
      console.error(error);
    }
  },

  async submitGradeVerification(submissionId: string) {
    const apiCall = "/submission/" + submissionId + "/verify";
    console.log("trying POST request to: " + apiCall);
    try {
      const res = await httpAxios.post(apiCall, {
        submission_id: submissionId  //eslint-disable-line
      });
      console.log("POST request to: " + res.config.baseURL + res.config.url);
      if (res.status === 200) {
        return true;
      } else {
        throwApiError("Response: " + res.status);
      }
    } catch (error) {
      console.error(error);
    }
  },
};
