<template>
  <div class="tab">
    <h1>Schema 1: Först behöver vi välja kurstillfälle.</h1>
    <CourseFinderBox
        :course-details="courseDetails"
        :course-code-list="courseCodeList"
        @refresh-courses-event="this.getCourseCodeList"
        @search-course-code-event="this.searchCourseCode"
        @selected-course-event="this.getCourseDetails"
    />
    <OccasionTable
        :occasion-arr="occasionArr"
        @refresh-occasions-event="this.refreshOccasions"
        @fetch-occasion-event="this.fetchOccasion"
    />
  </div>
</template>

<script>
import OccasionTable from "@/components/u4/OccasionTable.vue";
import CourseFinderBox from "@/components/u4/CourseFinderBox.vue";
import occasionApiService from "@/service/u4/occasionApiService";
import {mapMutations, mapState} from "vuex";
import courseApiService from "@/service/u4/courseApiService";
import modulesApiService from "@/service/u3/modulesApiService";

export default {
  name: "OccasionTab",
  components: {
    OccasionTable,
    CourseFinderBox,
  },
  data() {
    return {
      courseDetails: {},
      courseCodeList: [],
    };
  },
  computed: {
    ...mapState({
      activeCourseCode: state => state.activeCourseCode,
      occasionArr: state => state.scheduleStore.occasionArr
    }),
  },
  methods: {
    // todo: this does not work... seems to be the same issue as mapActions, need to use the (string, [string]) format.
    /*...mapMutations({
      setOccasionArr: state => state.scheduleStore.setOccasionArr,
      setSelectedOccasion: state => state.scheduleStore.setSelectedOccasion,
    }),*/
    ...mapMutations("scheduleStore", ["setOccasionArr", "setSelectedOccasion"]),

    /* Reload the occasions table. Mostly for testing requests. */
    async refreshOccasions() {
      console.log("refreshOccasions() called.");
      const res = await occasionApiService.getOccasionsByCourseCode();
      this.setOccasionArr(res); // mutate store state
    },

    /* Get meta info about an occasion...
     * maybe for a popup or side-panel info window.
     */
    async fetchOccasion(occasionCode) {
      console.log("fetchOccasion() called.");
      const res = await occasionApiService.getOccasionDetails(occasionCode); // hopefully res is only array of one.
      this.setSelectedOccasion(res[0]); // mutate store state
    },

    /* Gets metadata from backend for a course.
     * Sets the occasions list depending on course code,
     * todo: should consolidate metadata and details.
     */
    async getCourseDetails(courseCode) {
      this.setOccasionArr(await occasionApiService.getOccasionsByCourseCode(courseCode)); // set in store
      this.courseDetails = await courseApiService.getCourseDetails(courseCode); // not implemented
    },

    /* Get just a list of available courses, and then maps just the
     * codes to a local data property. */
    async getCourseCodeList() {
      const res = await courseApiService.getCourseCodeList();
      this.courseCodeList = res.map(item => item.id);
    },

    /* Searches for a part or full match case insensitive course code,
     * which is the beginnings of an elastic search implementation */
    async searchCourseCode(searchStr) {
      //const res = await courseApiService.getCourseCodeList();
      this.courseCodeList = "implementME!";
    }
  }
};
</script>

<style scoped></style>
