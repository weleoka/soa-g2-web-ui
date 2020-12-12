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
  getters: {}, // dummy getters replaced by mapState
  actions: {
    async populateModuleArr(context, courseCode) {
      console.debug("Populating moduleArr with courseCode: " + courseCode);
      let res = [];
      try {
        if (!courseCode) { // if not
          res = await moduleApiService.getAllModules()
        } else {
          res = await moduleApiService.getModulesByCourseCode(courseCode)
        }
        context.commit( "setModuleArr", res);
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
    // setModulesArr mutation is declared so that local actions can call it
    setModuleArr(state, payload) {
      console.log(
        "setModulesArr() mutation in store set with " +
          payload.length +
          " modules."
      );
      state.moduleArr = payload;
    }
    /*    async getModules(context) {
      try {
        context.commit("setModules", await moduleApiService.getAllModules());
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
        context.commit("setModules", await moduleApiService.getModuleDetails());
      } catch (e) {
        if (e instanceof TypeError) {
          console.log("No modules");
        } else {
          throw e;
        }
      }
    },*/
    /*    // Wanted to replace this with mapMutations, but due to it being committed to from local actions it's not possible.
    setModules(state, payload) {
      console.debug("setModules() mutation: " + payload.length + " modules."
      );
      state.myModules = payload;
    }*/
  }
};
