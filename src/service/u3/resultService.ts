/*
EA & SOA Group 2 HT2020
*/
import requests from "@/service/requests";
import {morphism} from "morphism";
import {Submission, submissionFromDto} from "@/service/types";

export default {
  /* get submissions by module id */
  async getSubmissionsByAssignment(moduleId: string) {
    console.debug(`resultService->getSubmissionsByAssignment(): ${moduleId}`);
    const apiCall = `/examination/${moduleId}`;
    const params = {};
    const res = await requests.getRequest(apiCall, params);
    return res.map(dto =>
        morphism(submissionFromDto, dto, Submission)
    );
  },

  /* set verified status on a grade. */
  async submitGradeVerification(submissionId: string) {
    console.debug(`resultService->submitGradeVerification(): ${submissionId}`);
    const apiCall = `/submission/${submissionId}/verify`;
    const params = {submission_id: submissionId}; //eslint-disable-line
    const res = await requests.getRequest(apiCall, params);
    return res.map(dto =>
        morphism(submissionFromDto, dto, Submission)
    );
  }
};
