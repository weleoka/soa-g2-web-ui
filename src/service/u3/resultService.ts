/*
EA & SOA Group 2 HT2020

This deals with runtime state across the whole app.
Often this is where we would use local storage db and
save state to a db on the client.
 */

import httpAxios from "@/service/httpAxios";
import { handle, throwApiError } from "@/service/errors";
import { morphism } from "morphism";
import { submissionFromDto } from "@/service/types";

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
  async getSubmissionsByAssignment(moduleId: string) {
    console.log(
      "Called resultService->getAssignments() with moduleId: " +
        moduleId
    );
    try {
      const res = await httpAxios.get("/examination/" + moduleId);
      console.log("GET request to: " + res.config.baseURL + res.config.url);
      if (res.status === 200) {
        if (res.data.length) {
          return res.data.map(dto => morphism(submissionFromDto, dto));
        } else {
          return [];
        }
      } else {
        throwApiError("Response: " + res.status);
        return [];
      }
    } catch (error) {
      throwApiError(error.message);
      return [];
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
      throwApiError(error.message);
    }
  }
};
