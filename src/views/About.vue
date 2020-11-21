<template>
  <div id="about">
    <h1>This is a random number addifier</h1>
  </div>
  <div id="app">
    <Random />
  </div>
</template>

<script>
import Random from "../components/samples/Random.vue";

export default {
  name: "About",
  components: {
    Random
  }
};
</script>

