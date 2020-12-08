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
    myModules: [],
  },
  getters: {

  },
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
    /*    async addModule() {
      const res = await myAxios.post("/modules", {
        code: this.moduleCode
      });
      console.log(res.data);
      this.modules = [...this.modules, res];

      this.todoName = "";
    }*/

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
    // Wanted to replace this with mapMutations, but due to is being committed to from local actions not possible.
    setActiveCourseCode(state, payload) {
      console.log("setActiveCourseCode() mutation recieved: " + payload);
      state.activeCourseCode = payload;
    },
    // Wanted to replace this with mapMutations, but due to is being committed to from local actions not possible.
    setModules(state, payload) {
      console.log(
          "setModules() mutation in store set with " +
          payload.length +
          " modules."
      );
      state.myModules = payload;
    }
  }
};
