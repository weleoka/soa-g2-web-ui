<template>
  <div>
    <h1>This is Time Tab component</h1>
    <VueCal />
  </div>
</template>

<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";

export default {
  name: "TimeTab",
  components: {
    VueCal
  },
};
</script>

<style scoped></style>
