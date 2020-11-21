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
