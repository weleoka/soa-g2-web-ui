/*
EA & SOA Group 2 HT2020

This deals with runtime state across the whole app.
Often this is where we would use local storage db and
save state to a db on the client.
 */

import requests from "@/service/requests";
/*
This deals with communications to and from SubmissionService
 */
export default {
  /* get a list of all courses */
  async getAllAssignments() {
    console.debug(`assignmentService->getAllAssignments()`);
    const apiCall = `assignments`;
    const params = {};
    const res = await requests.getMany(apiCall, params);
    /*    return res.map(dto =>
            morphism(assignmentFromDto, dto, Assignment)
        );*/
  },

  async getAssignmentsByModuleId(moduleId: string) {
    console.debug(`assignmentService->getAllAssignments()`);
    const apiCall = `assignments`;
    const params = {
      module_id: moduleId  //eslint-disable-line
    };
    const res = await requests.getMany(apiCall, params);
    /*  return res.map(dto =>
          morphism(assignmentFromDto, dto, Assignment)
      );*/
  }
};
