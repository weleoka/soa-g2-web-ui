<template>
  <header class="header-global">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <!-- Container wrapper -->
      <div class="container-fluid">
        <!-- Navbar brand -->

        <router-link class="navbar-brand" to="/">
          <img
            class="navbar-brand"
            src="/img/brand/logo.png"
            style="height: 90px"
            alt="logo"
          />
        </router-link>

        <!--<ul class="navbar-nav navbar-nav-hover align-items-lg-center">
          <li class="nav-item mr-2">
            <router-link to="/">Home</router-link>
          </li>
          <li class="nav-item mr-2">
            <router-link to="/about">RANDOMIZER</router-link>
          </li>

          <li class="nav-item mr-2">
            <router-link to="/testing">Testing</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/signin">Signin</router-link>
          </li>
        </ul>-->
        <!-- Toggle button -->
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="fas fa-bars"></i>
        </button>

        <!-- Collapsible wrapper -->
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <!-- Left links -->
          <ul class="navbar-nav mr-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link active" aria-current="page" to="/"
                >Hem</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/gradeworks"
                >Betygshanteraren</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/scheduleworks"
                >Schemahanteraren</router-link
              >
            </li>
            <li class="nav-item">|</li>
            <li class="nav-item">
              <router-link class="nav-link" v-if="!isSignedIn" to="/signin"
                >Signin</router-link
              >
              <router-link v-else @click="signout" to="/signout">
                <span v-if="isSignedIn"> - Sign out {{ userEmail }} - </span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
"use strict";

import { mapState } from "vuex";

export default {
  name: "MyHeader",
  computed: mapState({
    isSignedIn: state => state.authStoreModule.authUser.tokenId,
    userEmail: state => state.authStoreModule.authUser.userEmail
  }),
  //..mapGetters("authStoreModule", ["isSignedIn", "getUserEmail"])
  //...mapState(["authUser.userEmail"]),
  methods: {
    signout() {
      this.$store.dispatch("authStoreModule/signout");
      //this.$router.push("/Signin");
    }
  },
  // setup(props, context)
  // context has properties (attrs, slots, emit, parent, root) that are corresponding to:
  // this.$attrs, this.$slots, this.$emit, this.$parent, this.$root.
  // When setup is executed (this is before component has an instance)
  // you will only be able to access the following properties:
  //   props
  //   attrs
  //   slots
  //   emit
  //
  // In other words, you will not have access to the following component options:
  //   data
  //   computed
  //   methods
  setup(props) {
    console.log(
      "setup() in MyHeader.vue accessing props.userEmail:" + props.userEmail
    );
  }
};
</script>

<style scoped></style>
