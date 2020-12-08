/*
EA & SOA Group 2 HT2020

This deals with runtime state across the whole app.
Often this is where we would use local storage db and
save state to a db on the client.

Due to Vue 3 and Vuex 4 and TypeScript all piling through Webpack we have issues:
https://stackoverflow.com/questions/64080549/using-vuex-4-modules-in-vue-3-with-typescript-and-how-to-fix-cyclical-dependenc

https://github.com/vuejs-templates/webpack/issues/73

https://github.com/webpack-contrib/eslint-webpack-plugin
 */
import { createStore } from "vuex";
import myAxios from "../service/myAxios";
import moduleService from "@/service/u3/modulesApiService";
import { authStoreModule } from "@/store/authStore";

console.log(myAxios.defaults);

export default createStore({
  // Set strict mode to not allow access to state without going through mutations.
  //strict: process.env.NODE_ENV !== 'production',
  strict: true,

  state: {
    myModules: [],
    courseCodes: ["D0021E", "D0022E", "D0023E"],
    activeCourseCode: ""
  },

  getters: {
    getCourseCodes: state => state.courseCodes,
    getActiveCourseCode: state => state.activeCourseCode
    // getModulesById: (state) => (code: string) => {
    //   return state.myModules.find(myModule => myModule.code === code)
    // }
  },

  mutations: {
    setActiveCourseCode(state, payload) {
      console.log("setActiveCourseCode() mutation recieved: " + payload);
      state.activeCourseCode = payload;
    },
    setModules(state, payload) {
      console.log(
        "setModules() mutation in store set with " +
          payload.length +
          " modules."
      );
      state.myModules = payload;
    }
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

    // No idea if name collision with the mutation will occur...
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
  modules: {
    authStoreModule
    // add gradestore and schedulestore modules
  }
});
