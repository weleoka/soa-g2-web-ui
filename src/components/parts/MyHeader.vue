<template>
  <header class="header-global">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <!-- Container wrapper -->
      <div class="container-fluid">
        <!-- Navbar brand -->
        <a class="navbar-brand" href="#"
          ><router-link to="/">LOGO</router-link></a
        >
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
              <a class="nav-link active" aria-current="page" href="#"
                ><router-link to="/">Home</router-link></a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#"
                ><router-link to="/about">About</router-link></a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#"
                ><router-link to="/testing">Testing</router-link></a
              >
            </li>
            <li class="nav-item"> |
              <!--          <a v-if="!$auth.isAuthenticated" @click="login" class="button is-dark"><strong>Sign in</strong></a>
                        &lt;!&ndash; show logout when authenticated &ndash;&gt;
                        <a v-if="$auth.isAuthenticated" @click="logout" class="button is-dark"><strong>Log out</strong></a>
          -->
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                <router-link v-if="!isSignedIn" to="/signin">Signin</router-link>
                <router-link v-else @click="signout" to="/signout">Signout</router-link>
<!--                <p v-else @click="signout">Signout</p>-->
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <span v-if="!tester" @click="pingis">Hello there!</span>
  </header>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "MyHeader",
  computed: {
    ...mapGetters(["isSignedIn"]),
    //...mapState(["userEmail"])
    tester() {
      return this.$store.getters.getUserEmail;
    }
  },
  methods: {
    signout() {
      console.log("SIGNING OUT");
      this.$store.dispatch("signout");
      //this.$router.push("/Signin");
    },
    pingis() {
      console.log("EMAIL IS:" + this.tester);
    }
  }
};
</script>

<style scoped></style>
