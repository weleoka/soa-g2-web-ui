/*
EA & SOA Group 2 HT2020
 */

import signinService from "@/service/signinService";

export const authStoreModule = {
  namespaced: true,
  state: {
    authUser: {
      userEmail: "",
      userId: "",
      tokenId: ""
    }
  },
  getters: {
    isSignedIn: state => !!state.authUser.userEmail, // returns bool
    getUserEmail: state => state.authUser.userEmail
  },
  actions: {
    async doSignin(context, formData) {
      console.log("Trying to sign in: " + formData.email);
      const authObj = await signinService.signin(formData);
      if (authObj) {
        context.commit("setSignedin", authObj);
        return true;
      }
    },
    doSignout(context) {
      context.commit("signout");
      this.$router.push("/");
    }
  },
  mutations: {
    signout(state) {
      state.authUser.userEmail = "";
      state.authUser.userId = "";
      state.authUser.tokenId = "";
    },
    setSignedin(state, payload) {
      console.log("setSignedin mutation on store");
      state.authUser = payload;
    }
  }
};
