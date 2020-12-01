/*
EA & SOA Group 2 HT2020

This deals with runtime state across the whole app.
Often this is where we would use local storage db and
save state to a db on the client.
 */
import { createStore } from "vuex";
import myAxios from "../service/myAxios";
import moduleService from "@/service/modulesApiService";
import signinService from "@/service/signinService";

console.log(myAxios.defaults);

export default createStore({
  // Set strict mode to not allow access to state without going through mutations.
  //strict: process.env.NODE_ENV !== 'production',
  strict: true,

  state: {
    authUser: {
      userEmail: "",
      userId: "",
      tokenId: ""
    },
    myModules: [],
    courseCodes: ["D0021E", "D0022E", "D0023E"],
    activeCourseCode: ""
  },

  getters: {
    getCourseCodes: state => state.courseCodes,
    getActiveCourseCode: state => state.activeCourseCode,
    isSignedIn: state => state.authUser.tokenId,
    getUserEmail: state => state.authUser.userEmail
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
    },
    signout(state) {
      state.authUser.userEmail = "";
      state.authUser.userId = "";
      state.authUser.tokenId = "";
    },
    setSignedin(state, payload) {
      console.log("setSignedin mutation on store");
      state.authUser = payload;
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
    },

    // ============== AUTH ===========
    async doSignin(context, formData) {
      const debug = true;
      console.log("Trying to sign in: " + formData.email);
      const authObj = await signinService.signin(formData);
      if (authObj) {
        context.commit("setSignedin", authObj);
        return true;
      }
    },
    signout(context) {
      context.commit("signout");
    }
    // =========== END-AUTH =========
  },

  modules: {}
});
