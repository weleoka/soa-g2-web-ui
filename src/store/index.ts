import { createStore } from "vuex";
import router from '../router';
import myAxios from "../service/myAxios";

console.log(myAxios.defaults);

export default createStore({
  state: {
    user: null,
    userId: null,
    idToken: null,
    modules: {}
  },

  mutations: {
    setModules(state, data) {
      state.modules = data;
    },
    authUser (state, userData) {
      state.user = userData.user
      state.userId = userData.userId
      state.idToken = userData.token
    },
    logout(state){
      state.user = null
      state.userId= null
      state.idToken = null
    },
  },

  actions: {
    async getModules({commit}) {
      console.log("getModules async function hello!");
      try {
        const { data } = await myAxios.get("/modules"
            /*, {
          params: {
            code: "module02"
          }
        }*/);
        console.log("MODULES FOUND: " + data);
        commit("setModules", data);
      } catch (error) {
        console.error(error);
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

    login ({commit}, authData) {
      myAxios.post('/login',{
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
          .then(res => {
            console.log(res)
          })
          .catch(error => {
            console.log(error)
            console.log("I know you are using fake login data!")
            commit('authUser', {
              token: "myFakeToken",
              userId: "MyFAkeUserUUID",
              user: authData.email
            })
            router.push('/About')
          })
    },
    logout({commit}){
      commit('logout')
      router.push('/login');
    }
  },

  modules: {}
});
