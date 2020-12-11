/*
EA & SOA Group 2 HT2020

This deals with runtime state across the whole app.
Often this is where we would use local storage db and
save state to a db on the client.
 */

import moduleService from "@/service/u3/modulesApiService";

export const scheduleStoreModule = {
  namespaced: true,
  state: {
    selectedOccasion: [],
    occasionArr: []
  },
  getters: {},
  actions: {
    /**
     * Commits the active courseCode to local store state and then fetches
     * occasions by course code, and commits that to local store state.
     */
    async enableActiveCourseCode(context, courseCode) {
      context.commit("setActiveCourseCode", courseCode); // todo: this may not work...
      try {
        context.commit(
          "setModules",
          await moduleService.getModulesByCourseCode(courseCode)
        );
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
    // todo: try removing and replacing with mapMutations in callers.
    setSelectedOccasion(state, payload) {
      console.debug("setSelectedOccasion() mutation: " + payload);
      state.selectedOccasion = payload;
    },
    setOccasionArr(state, payload) {
      console.debug("setOccasionArr() mutation: " + payload);
      state.occasionArr = payload;
    }
  }
};
