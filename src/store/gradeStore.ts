/*
EA & SOA Group 2 HT2020

This deals with runtime state across the whole app.
Often this is where we would use local storage db and
save state to a db on the client.
 */

import moduleService from "@/service/u3/modulesApiService";

export const gradeStoreModule = {
  namespaced: true,
  state: {
    modulesArr: [],
  },
  getters: {
    getModulesArr: state => state.modulesArr,
  },
  actions: {
    async populateModulesArr(context, courseCode) { // private function
      try {
        if (courseCode) {
          context.commit("setModulesArr", await moduleService.getAllModules());
        } else {
          context.commit(
              "setModulesArr",
              await moduleService.getModulesByCourseCode(courseCode)
          );
        }
      } catch (e) {
        if (e instanceof TypeError) {
          console.log("No modules");
        } else {
          throw e;
        }
      }
    },

    async storeGetModuleDetails(context) {
      try {
        context.commit("setModulesArr", await moduleService.getModuleDetails());
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
  },
  mutations: {
    setModulesArr(state, payload) {
      console.log(
          "setModulesArr() mutation in store set with " +
          payload.length +
          " modules."
      );
      state.modulesArr = payload;
    }
  }
};
