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
import { mapState } from "vuex";

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
  computed: mapState({
    courseCodesArr: state => state.courseCodeArr,
    currentActiveCourseCode: state => state.activeCourseCode
  }),
  beforeMount() {
    for (let i = 0; i < this.courseCodesArr.length; i++) {
      const courseCode = this.courseCodesArr[i];
      if (courseCode === this.currentActiveCourseCode) {
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
