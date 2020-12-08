<template>
  <div>
    <label>
      Aktiv kurskod:
      <select
        @change="$emit('selection-event', this.selected)"
        v-model="selected"
        ><option
          v-for="(option, i) in options"
          :key="i"
          v-bind:value="option.id"
        >
          {{ option.text }}
        </option>
      </select>
    </label>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CourseCodeDropdown",
  props: {
    preselected: String
  },
  data() {
    return {
      selected: "",
      options: [
        {
          text: "alla",
          id: "ALL"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["getCourseCodes", "getActiveCourseCode"])
  },
  beforeMount() {
    const courseCodes = this.getCourseCodes;
    for (let i = 0; i < courseCodes.length; i++) {
      const courseCode = courseCodes[i];
      if (courseCode === this.getActiveCourseCode) {
        // here we should have some sort of event trigger... who knows.
      }
      this.options.push({
        text: courseCode,
        id: courseCode
      });
    }
  }
};
</script>

<style scoped></style>
