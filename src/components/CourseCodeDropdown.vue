<template>
  <div id="app">
    <label>
      Aktiv kurskod:
      <select v-model="selected">
        <option
          v-for="(option, i) in options"
          :key="i"
          v-bind:value="option.id"
        >
          {{ option.text }}
        </option>
      </select>
    </label>
    <button @click="$emit('selection-event', this.selected)">Refresh</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CourseCodeDropdown",
  data() {
    return {
      selected: "",
      options: []
    };
  },
  computed: {
    ...mapGetters(["getCourseCodes"])
  },
  beforeMount() {
    const courseCodes = this.getCourseCodes;
    for (let i = 0; i < courseCodes.length; i++) {
      const courseCode = courseCodes[i];
      this.options.push({ text: courseCode, id: courseCode });
    }
  }
};
</script>

<style scoped></style>
