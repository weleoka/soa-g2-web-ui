import { createStore } from "vuex"
//import router from '../router'
import myAxios from "../service/myAxios"
import moduleService from "@/service/moduleApiService"
import signinService from "@/service/signinService"

console.log(myAxios.defaults);

export default createStore({
  state: {
    user: null,
    userId: null,
    idToken: null,
    myModules: []
  },

  getters: {
    // getModulesById: (state) => (code: string) => {
    //   return state.myModules.find(myModule => myModule.code === code)
    // }
  },

  mutations: {
    setModules(state, data) {
      console.log("SET " + data.length + " MODULES IN STORE.")
      state.myModules = data
    },
    authUser (state, userData) {
      state.user = userData.user
      state.userId = userData.userId
      state.idToken = userData.token
    },
    signout(state){
      state.user = null
      state.userId= null
      state.idToken = null
    },
  },

  actions: {
    async getModules(context) {
      const allModules = await moduleService.getModules()
      if (allModules) {
        context.commit("setModules", allModules.data)
      } else {
        console.warn("No response data.")
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

    // ============== AUTH ===========
    async signin (context, authData) {
      const res = await signinService.signin(authData);
      if (!res) { // Note the NOT!
        context.commit('authUser', {
          token: "myFakeToken",
          userId: "MyFAkeUserUUID",
          user: authData.email
        })
        return true;
      }
    },
    signout(context){
      context.commit('signout')
    }
    // =========== END-AUTH =========
  },


  modules: {}
});
