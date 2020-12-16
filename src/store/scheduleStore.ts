/*
EA & SOA Group 2 HT2020

This deals with runtime state across the whole app.
Often this is where we would use local storage db and
save state to a db on the client.
 */

import occasionApiService from "@/service/u4/occasionApiService";

export const scheduleStoreModule = {
  namespaced: true,
  state: {
    occasionArr: [],
    activeOccasionCode: ""
  },
  getters: {},
  actions: {
    /**
     * Commits the active courseCode to local root store state and then fetches
     * occasions by course code, and commits those to local store state.
     */
    async doSetActiveCourseCode(context, courseCode) {
      context.commit("setActiveCourseCode", courseCode);
      try {
        context.commit(
          "setOccasionArr",
          await occasionApiService.getOccasionsByCourseCode(courseCode)
        );
      } catch (e) {
        if (e instanceof TypeError) {
          console.error("No occasions");
        } else {
          throw e;
        }
      }
    }
  },
  mutations: {
    // todo: try removing and replacing with mapMutations in callers.
    setActiveOccasionCode(state, payload) {
      console.debug("setActiveOccasionCode() mutation: " + payload);
      state.activeOccasionCode = payload;
    },
    setOccasionArr(state, payload) {
      console.debug("setOccasionArr() mutation: " + payload);
      state.occasionArr = payload;
    }
  }
};
