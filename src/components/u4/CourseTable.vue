<template>
  <div class="table-responsive py-4" id="course-table">
    <table class="table table-borderless table-striped table-hover">
      <thead class="thead-light">
      <tr>
        <th scope="col">Välj kurs av {{ courseArr.length }} alternativ</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="courseArr.length === 0">
        <td>Sök eller hämta kurslista</td>
      </tr>
      <tr
          v-for="(course, i) in courseArr"
          :key="i"
          :class="{'clicked-row' : clickedRow === i }"
          @click="this.rowClickedHandler(i, course.id)"
      >
        <td>{{ course.id }} - {{course.description}} (status: {{course.status}}) </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

import {watchEffect} from "@vue/runtime-core";

export default {
  name: "CourseTable",
  props: {
    courseArr: Array
  },
  data() {
    return {
      clickedRow: null
    };
  },
  watch: {
    courseArr() { this.clickedRow = null }
  },
  methods: {
    rowClickedHandler(rowId, courseId) {
      this.clickedRow = rowId;
      this.$emit('selected-course-event', courseId)
    }
  }
};
</script>

<style scoped>
#course-table {
  overflow: auto;
  overflow-y: scroll;
  flex-grow: inherit;
  height: content-box;
  width: 550px;
  padding-right: 1em;
  border-right: none;
}
</style>
