<template>
  <div class="table-responsive py-4" id="course-table">
    <table class="table table-borderless table-striped table-hover">
      <thead class="thead-light">
        <tr>
          <th scope="col">Välj kurs av {{ courseArr.length }} alternativ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!courseArr.length">
          <td>Sök eller hämta kurslista</td>
        </tr>
        <tr
          v-for="(course, i) in courseArr"
          :key="i"
          :class="{ 'clicked-row': clickedRow === i }"
          @click="rowClickedHandler(i, course)"
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
import { Options, PropOptions, Vue } from "vue-class-component";
import { Course } from "@/entities/course";

@Options({
  name: "CourseTable",
  props: {
    courseArr: {
      type: Array,
      default() {
        return [""];
      }
    } as PropOptions<Course[]>
  },
  emits: ["selected-course-event"],
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
    rowClickedHandler(rowId, course: Course) {
      this.clickedRow = rowId;
      this.$emit("selected-course-event", course);
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
