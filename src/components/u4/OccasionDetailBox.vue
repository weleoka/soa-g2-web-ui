<template>
  <div v-if="selectedOccasion">
    {{ selectedOccasion.periodCode }}
  </div>
</template>

<script>
"use strict";

export default {
  name: "OccasionDetailBox",
  props: {
    selectedOccasion: [] // in parent template explicitly naming prop it will be selected_occasion
  }
};
</script>

<style scoped></style>
