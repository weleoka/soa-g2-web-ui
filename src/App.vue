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
            <li class="nav-item">
              <a class="nav-link" href="#">
                <router-link v-if="!idToken" to="/signin">Signin</router-link>
                <span v-else @click="signout">Signout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <router-view />
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      idToken: this.$store.idToken
    };
  },
  created() {
    console.log("NODE_ENV: " + process.env.NODE_ENV);
    console.log("VUE_APP_VERSION: " + process.env.VUE_APP_VERSION);
    console.log("VUE_APP_API_URL: " + process.env.VUE_APP_API_URL);
    console.log("VUE_BASE_URL: " + process.env.BASE_URL);
    console.log("PORT: " + process.env.SERVER_PORT);
    console.log("DOMAIN: " + process.env.SERVER_DOMAIN);
  },
  methods: {
    signout() {
      this.$store.dispatch("signout");
      this.$router.push("/About");
    }
  }
};
</script>

<style></style>
