<template>
  <div class="container-v">
    <h1>Steg 1: välj kurstillfälle</h1>
    <CourseFinderBox
      :course-arr="courseArr"
      @refresh-courses-event="refreshCoursesHandler"
      @search-course-code-event="searchCourseHandler"
      @selected-course-event="selectedCourseHandler"
    />
    <hr />
    <OccasionFinderBox
      :occasion-arr="occasionArr"
      @selected-occasion-event="selectedOccasionHandler"
      @refresh-occasions-event="refreshOccasionsHandler"
      @clear-occasions-event="clearOccasionBoxHandler"
    />
  </div>
</template>

<script lang="ts">
import CourseFinderBox from "@/components/u4/CourseFinderBox.vue";
import OccasionFinderBox from "@/components/u4/OccasionFinderBox.vue";
import occasionService from "@/service/u4/occasionService";

import { mapMutations, mapState } from "vuex";
import courseService from "@/service/u4/courseService";
import { Options, Vue } from "vue-class-component";
import { Occasion } from "@/entities/occasion";
import { Course } from "@/entities/course";
import { Ut } from "@/service/utils";

//import {} from "@/entities/types"
//const types = require("@/entities/types")

@Options({
  name: "OccasionTab",
  components: {
    CourseFinderBox,
    OccasionFinderBox
  },
  data() {
    return {
      occasionArr: [],
      courseArr: []
    };
  },
  computed: {
    ...mapState(["selectedCourse"])
  },
  methods: {
    // this does not work, same as mapActions, need to use the (string, [string]) format,
    // however this is useful for TypeScript to not include Vuex.
    //...mapMutations({setSelectedOccasion: state => state.scheduleStore.setSelectedOccasion})
    ...mapMutations("scheduleStore", ["setSelectedOccasion"]),
    ...mapMutations(["setSelectedCourse"]),
    //...mapActions(["scheduleStore"], ["doSetSelectedCourse"]),

    /* Populates occasionArr by course */
    async selectedCourseHandler(course: Course) {
      console.debug("OccasionTab->selectedCourseHandler()");
      //await this.doSetSelectedCourse(course);
      this.setSelectedCourse(course);
      try {
        this.occasionArr = await occasionService.getOccasionsByCourseId(
          course.id
        );
      } catch (e) {
        if (e.name === "ApiError") {
          console.warn(`ApiError: ${e.message} ${e.trace}`);
        } else {
          console.warn(`Error ${e.message}`);
        }
      }
      console.debug(`OccasionArr length: ${this.occasionArr.length}`);
    },

    /* Populates courseArr */
    async refreshCoursesHandler() {
      console.debug("OccasionTab->refreshCoursesHandler()");
      try {
        this.courseArr = await courseService.getAllCourses();
      } catch (e) {
        if (e.name === "ApiError") {
          console.warn(`ApiError ${e.message}`);
        } else {
          console.warn(`Error ${e.message}`);
        }
      }
      console.debug(`CourseArr length: ${this.courseArr.length}`);
    },

    /* Searches for a part or full match case insensitive course code.
     * If no search string is supplied it sets the course list to none.
     */
    async searchCourseHandler(searchStr) {
      console.debug("OccasionTab->searchCourseHandler()");
      if (searchStr) {
        // todo: make a serverside search API endpoint
        const regex = RegExp(searchStr, "i"); // i for case insensitive
        // This has been causing some grief where TS cant seem to understand
        // what morphism returns. So we forcefully cast to desired type.
        // @ts-ignore
        const res: Array<Course> = await courseService.getAllCourses();
        if (Ut.isSetArr(res)) {
          const arr = [];
          for (let i = 0; i < res.length; i++) {
            if (res[i].id.match(regex)) {
              console.debug("Found match: " + res[i].id);
              arr.push(res[i]);
            }
          }
          this.courseArr = arr;
        } else {
          this.courseArr = [];
        }
      } else {
        this.courseArr = [];
      }
    },

    /* Reloads occasionArr in OccasionTab */
    async refreshOccasionsHandler() {
      console.debug("OccasionTab->refreshOccasionsHandler()");
      this.occasionArr = await occasionService.getAllOccasions();
    },

    /* Sets selectedOccasion in store */
    async selectedOccasionHandler(occasion) {
      console.debug("OccasionTab->selectedOccasionHandler()");
      const course = await courseService.getCourseByCourseId(
        occasion.courseCode
      );
      this.setSelectedCourse(course);
      this.setSelectedOccasion(occasion); // mutate store
    },

    /* Clears occasionArr in OccasionTab */
    clearOccasionBoxHandler() {
      console.debug("OccasionTab->clearOccasionBoxHandler()");
      this.setSelectedOccasion(new Occasion()); // mutate store
      this.occasionArr = [];
    }
  }
})
export default class OccasionTab extends Vue {}
</script>

<style scoped></style>
