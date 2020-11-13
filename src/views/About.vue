<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
  <div id="app">
    <Random />
  </div>
</template>

<script>
import Random from "../components/Random.vue";

export default {
  name: "App",
  components: {
    Random
  }
};
</script>

