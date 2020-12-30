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

<script lang="ts">
import { mapState } from "vuex";
import { Options, Vue } from "vue-class-component";

@Options({
  name: "CourseCodeDropdown",
  props: {
    preselected: String
  },
  emits: ["selection-event"],
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
  computed: mapState(["courseCodeArr", "selectedCourse"]),
  beforeMount() {
    for (let i = 0; i < this.courseCodeArr.length; i++) {
      const courseCode = this.courseCodeArr[i];
      if (courseCode === this.selectedCourse) {
        // todo: make the dropdown display the right course code on entry.
      }
      this.options.push({
        text: courseCode,
        id: courseCode
      });
    }
  }
})
export default class CourseCodeDropdown extends Vue {}
</script>

<style scoped></style>
