import { createStore } from "vuex"
import myAxios from "../service/myAxios"
import moduleService from "@/service/moduleApiService"
import signinService from "@/service/signinService"

console.log(myAxios.defaults);

export default createStore({
  // Set strict mode to not allow access to state without going through mutations.
  //strict: process.env.NODE_ENV !== 'production',
  strict: true,

  state: {
    authUser: {
      userEmail: "",
      userId: "",
      tokenId: "",
    },
    myModules: []
  },

  getters: {
    isSignedIn: state => state.authUser.tokenId,
    getUserEmail: state => state.authUser.userEmail,
    // getModulesById: (state) => (code: string) => {
    //   return state.myModules.find(myModule => myModule.code === code)
    // }
  },

  mutations: {
    setModules(state, payload) {
      console.log("setModules() mutation in store set with " + payload.length + " MODULES.")
      state.myModules = payload
    },
    signout(state) {
      state.authUser.userEmail = ""
      state.authUser.userId = ""
      state.authUser.tokenId = ""
    },
    setSignedin(state, payload) {
      console.log("setSignedin mutation on store")
      state.authUser = payload
    }
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
    async doSignin (context, formData) {
      const debug = true;
      console.log("Trying to sign in: " + formData.email)
      const authObj = await signinService.signin(formData);
      if (authObj) {
        context.commit("setSignedin", authObj)
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
