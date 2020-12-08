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
import { authStoreModule } from "@/store/authStore";
import { gradeStoreModule } from "@/store/gradeStore";
import { scheduleStoreModule } from "@/store/scheduleStore";

console.log(myAxios.defaults);

export default createStore({
  // Set strict mode to not allow access to state without going through mutations.
  //strict: process.env.NODE_ENV !== 'production',
  strict: true,
  state: {
    courseCodeArr: ["D0021E", "D0022E", "D0023E"],
    activeCourseCode: ""
  },
  getters: { // replaced by mapState in components
    //getCourseCodes: state => state.courseCodeArr,
    //getActiveCourseCode: state => state.activeCourseCode
  },
  mutations: {
/*    setActiveCourseCode(state, payload) {
      console.log("setActiveCourseCode() mutation recieved: " + payload);
      state.activeCourseCode = payload;
    },*/
  },
  actions: {
  },
  modules: {
    // This makes your getters, mutations, and actions accessed by,
    // eg: 'myModule/myModularizedThing' instead of mounting getters,
    // mutations, and actions to the root namespace.
    authStoreModule,
    gradeStoreModule,
    //moduleStore: gradeStoreModule, // it's possible to remap the module to another name
    scheduleStoreModule
  }
});
