/* EA & SOA Group 2 HT2020 This is where the main layout is made. Base
components like header and footer which should be visible everywhere can be
added here. */
<template>
  <NavBar />
  <div class="main-content">
    <router-view />
  </div>
</template>

<script>
import NavBar from "@/components/parts/NavBar";

export default {
  name: "App",
  components: {
    NavBar
  },
  created() {
    //console.log("NODE_ENV: " + process.env.NODE_ENV);
    //console.log("VUE_APP_VERSION: " + process.env.VUE_APP_VERSION);
    //console.log("VUE_APP_API_URL: " + process.env.VUE_APP_API_URL);
    console.log("VUE_BASE_URL: " + process.env.BASE_URL);
    //console.log("PORT: " + process.env.SERVER_PORT);
    //console.log("DOMAIN: " + process.env.SERVER_DOMAIN);
  }
};
</script>

/* Playing with styles for the app where the class or id is used throughout
multiple components? Do it here for now as we aren't working with scc pre-compilers. */
<style>
@import "/css/style.css";
</style>
