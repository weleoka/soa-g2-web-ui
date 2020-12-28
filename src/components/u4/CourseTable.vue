<template>
  <div class="table-responsive py-4" id="course-table">
    <table class="table table-borderless table-striped table-hover">
      <thead class="thead-light">
        <tr>
          <th scope="col">
            Välj kurs av {{ this.courseArr.length }} alternativ
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="this.courseArr.length === 0">
          <td>Sök eller hämta kurslista</td>
        </tr>
        <tr
          v-for="(course, i) in this.courseArr"
          :key="i"
          :class="{ 'clicked-row': this.clickedRow === i }"
          @click="this.rowClickedHandler(i, course.id)"
        >
          <td>
            {{ course.id }} - {{ course.nameSe }} (status: {{ course.status }})
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import {Options, PropOptions, Vue} from "vue-class-component";
import {Course} from "@/service/types";

@Options({
  name: "CourseTable",
  props: {
    courseArr: {
      type: Array,
      default() {
        return [];
      }
    } as PropOptions<Course[]>
  },
  data() {
    return {
      clickedRow: null
    };
  },
  watch: {
    courseArr() {
      this.clickedRow = null;
    }
  },
  methods: {
    rowClickedHandler(rowId, courseId) {
      this.clickedRow = rowId;
      this.$emit("selected-course-event", courseId);
    }
  }
})
export default class CourseTable extends Vue {}
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
