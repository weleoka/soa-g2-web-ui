<template>
  <MyHeader />
  <router-view />
</template>

<script>
import MyHeader from "@/components/parts/MyHeader";

export default {
  name: "App",
  components: {
    MyHeader
  },
  created() {
    console.log("NODE_ENV: " + process.env.NODE_ENV);
    console.log("VUE_APP_VERSION: " + process.env.VUE_APP_VERSION);
    console.log("VUE_APP_API_URL: " + process.env.VUE_APP_API_URL);
    console.log("VUE_BASE_URL: " + process.env.BASE_URL);
    console.log("PORT: " + process.env.SERVER_PORT);
    console.log("DOMAIN: " + process.env.SERVER_DOMAIN);
  }
};
</script>

<style></style>
