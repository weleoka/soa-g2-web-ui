/*
EA & SOA Group 2 HT2020

This deals with runtime state across the whole app.
Often this is where we would use local storage db and
save state to a db on the client.
 */

import moduleApiService from "@/service/u3/moduleService";
import courseService from "@/service/u4/courseService";

export const gradeStoreModule = {
  namespaced: true,
  state: {
    moduleArr: []
  },
  actions: {
    /* Using a courseCode string fetch an actual Course object for setting selectedCourse,
     * this action then fetches the relevant course modules for the selected course.
     * If no parameter for courseCode then set selectedCourse to none. */
    //async doSelectCourseByCourseCode(context, courseCode) { // equal to object unpacking below.
    async doSelectCourseByCourseCode({ dispatch, commit }, courseCode) {
      console.debug("gradeStore->doSelectCourseByCourseCode(): " + courseCode);
      try {
        const res = await courseService.getCourseByCourseCode(courseCode);
        commit("setSelectedCourse", res[0], { root: true }); // dispatches item [0] to root store
      } catch (e) {
        if (e.name === "ApiError") {
          console.warn("API error: " + e.message);
        } else {
          throw Error(e);
        }
      }
      dispatch("populateModuleArr");
    },

    /* Loads modules from the value of rootState.selectedCourse. */
    async populateModuleArr({ commit, rootState }) {
      try {
        console.debug(
          "gradeStore->populateModuleArr(): " + rootState.selectedCourse.id
        );
        const res = await moduleApiService.getModulesByCourseCode(
          rootState.selectedCourse.id
        );
        commit("setModuleArr", res);
      } catch (e) {
        if (e instanceof TypeError) {
          console.error("Course not set, or no modules: " + e);
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
