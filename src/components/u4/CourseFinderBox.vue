<template>
  <div>
    <div class="container course-finder-box">
      <div class="container-v" id="course-search-input">
        <h3>Val av kurs</h3>
        <p>Sök efter kurs, och välj i tabellen till höger.</p>
        <!-- todo: implement elastic search! -->
        <label
          >Sök kurs:
          <input
            type="text"
            v-model="searchStr"
            placeholder="kurskod"
            @keyup.enter="$emit('search-course-code-event', searchStr)"
          />
        </label>
        <div class="container-compact">
          <button
            type="button"
            class="btn-a"
            @click="$emit('search-course-code-event', searchStr)"
          >
            Sök
          </button>
          <button
            type="button"
            class="btn-a"
            @click="$emit('refresh-courses-event')"
          >
            Hämta alla
          </button>
          <button type="button" class="btn-a" @click="clearSearch">
            Rensa
          </button>
        </div>
      </div>
      <CourseTable
        :course-arr="courseArr"
        @selected-course-event="selectedCourseHandler"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, PropOptions, Vue } from "vue-class-component";
import { Course } from "@/service/types";
import CourseTable from "@/components/u4/CourseTable.vue";

@Options({
  name: "CourseFinderBox",
  components: {
    CourseTable
  },
  props: {
    courseArr: {
      type: Array,
      default() {
        return [];
      }
    } as PropOptions<Course[]>
  },
  emits: [
    "selected-course-event",
    "refresh-courses-event",
    "search-course-code-event"
  ],
  data() {
    return {
      searchStr: "" // full, or part, case-insensitive matching a course code
    };
  },
  methods: {
    selectedCourseHandler(course) {
      // event bubble
      this.$emit("selected-course-event", course);
    },
    clearSearch() {
      this.searchStr = "";
      this.$emit("search-course-code-event", this.searchStr);
    }
  }
})
export default class CourseFinderBox extends Vue {}
</script>

<style scoped>
#course-search-input {
  flex-grow: 1;
}

.course-finder-box {
  height: 300px;
}
</style>
