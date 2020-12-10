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
    occasionArr: [],
    myModules: []
  },
  getters: {},
  actions: {
    async getModules(context) {
      try {
        context.commit("setModules", await moduleService.getAllModules());
      } catch (e) {
        if (e instanceof TypeError) {
          console.log("No modules");
        } else {
          throw e;
        }
      }
    },
    async getModuleDetails(context) {
      try {
        context.commit("setModules", await moduleService.getModuleDetails());
      } catch (e) {
        if (e instanceof TypeError) {
          console.log("No modules");
        } else {
          throw e;
        }
      }
    },

    /**
     * Commits the active courseCode to local store state and then fetches
     * modules by course code, and commits that to local store state.
     */
    async setActiveCourseCode(context, courseCode) {
      context.commit("setActiveCourseCode", courseCode);
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
    // Wanted to replace this with mapMutations, but due to it being committed to from local actions it's not possible.
    setActiveCourseCode(state, payload) {
      console.log("setActiveCourseCode() mutation: " + payload);
      state.activeCourseCode = payload;
    },
    setSelectedOccasion(state, payload) {
      console.log("setSelectedOccasion() mutation: " + payload);
      state.selectedOccasion = payload;
    },
    setOccasionArr(state, payload) {
      console.log("setOccasionArr() mutation: " + payload);
      state.occasionArr = payload;
    },
    // Wanted to replace this with mapMutations, but due to it being committed to from local actions it's not possible.
    setModules(state, payload) {
      console.log(
        "setModules() mutation: " + payload.length +
          " modules."
      );
      state.myModules = payload;
    }
  }
};
