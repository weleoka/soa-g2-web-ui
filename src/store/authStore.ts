/*
EA & SOA Group 2 HT2020

This deals with runtime state across the whole app.
Often this is where we would use local storage db and
save state to a db on the client.
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
/*  getters: {
    isSignedIn: state => state.authUser.tokenId,
    getUserEmail: state => state.authUser.userEmail
  },*/
  actions: {
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
