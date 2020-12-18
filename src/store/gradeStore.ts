/*
EA & SOA Group 2 HT2020

This deals with runtime state across the whole app.
Often this is where we would use local storage db and
save state to a db on the client.
 */

import moduleApiService from "@/service/u3/modulesApiService";

export const gradeStoreModule = {
  namespaced: true,
  state: {
    moduleArr: []
  },
  actions: {
    async populateModuleArr(context, courseCode) {
      console.debug("Populating moduleArr for courseCode: " + courseCode);
      try {
        const res = await moduleApiService.getModulesByCourseCode(courseCode);
        context.commit("setModuleArr", res);
      } catch (e) {
        if (e instanceof TypeError) {
          console.log("No modules");
        } else {
          throw e;
        }
      }
    }
  },
  mutations: {
    // setModulesArr mutation declared so that local actions can call it
    setModuleArr(state, payload) {
      console.log(
        "setModulesArr() mutation in store set with " +
          payload.length +
          " modules."
      );
      state.moduleArr = payload;
    }
  }
};
