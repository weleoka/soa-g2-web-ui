<template>
  <div id="app">
    <label>Aktiv kurskod:
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
    <button @click="refreshData">Refresh</button>
<!--    <span>Selected: {{ selected }}</span>-->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CourseCodeDropdown",
  data() {
    return {
      selected: "",
      options: []
    };
  },
  computed: {
    ...mapGetters(["getCourseCodes"]),
    ...mapActions(["setActiveCourseCode"])
  },
  beforeMount() {
    const courseCodes = this.getCourseCodes;
    for (let i = 0; i < courseCodes.length; i++) {
      const courseCode = courseCodes[i];
      this.options.push({ text: courseCode, id: courseCode });
    }
    console.log("Valid course codes are: " + this.options);
  },
  methods: {
    refreshData() {
      this.$store.dispatch("setActiveCourseCode", this.selected);
    }
  }
};
</script>

<style scoped></style>
