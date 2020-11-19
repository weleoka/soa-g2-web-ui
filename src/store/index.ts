import { createStore } from "vuex"
import myAxios from "../service/myAxios"
import moduleService from "@/service/moduleApiService"
import signinService from "@/service/signinService"

console.log(myAxios.defaults);

export default createStore({
  state: {
    userEmail: "",
    userId: "",
    idToken: "",
    myModules: []
  },

  getters: {
    isSignedIn: state => state.idToken,
    getUserEmail: state => state.userEmail,
    // getModulesById: (state) => (code: string) => {
    //   return state.myModules.find(myModule => myModule.code === code)
    // }
  },

  mutations: {
    setModules(state, data) {
      console.log("SET " + data.length + " MODULES IN STORE.")
      state.myModules = data
    },
    setSignedIn(state, authData) {
      console.log("HOWEVER, HERE I NEVER GET EMAIL INFO: " + authData.email)
      state.userEmail = authData.email
      state.userId = authData.userId
      state.idToken = authData.token
    },
    signout(state){
      state.userEmail = ""
      state.userId= ""
      state.idToken = ""
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
        console.log("SETTING SIGNED IN STATUS FOR:" + authData.email)
        context.commit('setSignedIn', {
          token: "myFakeToken",
          userId: "MyFAkeUserUUID",
          userEmail: authData.email
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
