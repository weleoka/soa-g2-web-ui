<template>
  <div>
    <h1>Steg 1: välj kurstillfälle</h1>
    <br />
    <CourseFinderBox
      :course-arr="courseArr"
      @refresh-courses-event="this.refreshCoursesHandler"
      @search-course-code-event="this.searchCourseHandler"
      @selected-course-event="this.selectedCourseHandler"
    />
    <hr />
    <OccasionFinderBox
      :occasion-arr="occasionArr"
      @selected-occasion-event="this.selectedOccasionHandler"
      @refresh-occasions-event="this.refreshOccasionsHandler"
      @clear-occasions-event="this.clearOccasionBoxHandler"
    />
  </div>
</template>

<script lang="ts">
import CourseFinderBox from "@/components/u4/CourseFinderBox.vue";
import OccasionFinderBox from "@/components/u4/OccasionFinderBox.vue";
import occasionApiService from "@/service/u4/occasionApiService";

import { mapMutations, mapState } from "vuex";
import courseApiService from "@/service/u4/courseApiService";
import { Options, Vue } from "vue-class-component";

@Options({
  name: "OccasionTab",
  components: {
    CourseFinderBox,
    OccasionFinderBox
  },
  data() {
    return {
      courseArr: [],
      occasionArr: []
    };
  },
  computed: {
    ...mapState(["selectedCourse"])
  },
  methods: {
    // this does not work, same as mapActions, need to use the (string, [string]) format,
    // however it's useful for TypeScript separation to Vuex.
    //...mapMutations({setSelectedOccasion: state => state.scheduleStore.setSelectedOccasion})
    ...mapMutations("scheduleStore", ["setSelectedOccasion"]),
    ...mapMutations(["setSelectedCourse"]),
    //...mapActions(["scheduleStore"], ["doSetSelectedCourse"]),

    /* Populates occasionArr by course */
    async selectedCourseHandler(course) {
      console.debug("OccasionTab->selectedCourseHandler()");
      //await this.doSetSelectedCourse(course);
      this.setSelectedCourse(course);
      this.occasionArr = await occasionApiService.getOccasions(course);
    },

    /* Populates courseArr */
    async refreshCoursesHandler() {
      console.debug("OccasionTab->refreshCoursesHandler()");
      this.courseArr = await courseApiService.getCourses();
    },

    /* Searches for a part or full match case insensitive course code.
     * If no search string is supplied it sets the course list to none.
     */
    async searchCourseHandler(searchStr) {
      console.debug("OccasionTab->searchCourseHandler()");
      if (searchStr) {
        // todo: make a serverside search API endpoint
        const regex = RegExp(searchStr, "i"); // i for case insensitive
        const res = await courseApiService.getCourses();
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
    },

    /* Reloads occasionArr in OccasionTab */
    async refreshOccasionsHandler() {
      console.debug("OccasionTab->refreshOccasionsHandler()");
      this.occasionArr = await occasionApiService.getOccasions();
    },

    /* Sets selectedOccasion in store */
    async selectedOccasionHandler(occasion) {
      console.debug("OccasionTab->selectedOccasionHandler()");
      this.setSelectedOccasion(occasion); // mutate store
    },

    /* Clears occasionArr in OccasionTab */
    clearOccasionBoxHandler() {
      console.debug("OccasionTab->clearOccasionBoxHandler()");
      this.setSelectedOccasion(""); // mutate store
      this.occasionArr = [];
    }
  }
})
export default class OccasionTab extends Vue {}
</script>

<style scoped></style>
