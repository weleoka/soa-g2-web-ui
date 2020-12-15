<template>
  <div>
    <h1>Schema 1: Först behöver vi välja kurstillfälle.</h1>
    <h3>Kurssökning</h3>
    <CourseFinderBox
        :course-code-list="courseCodeList"
        @refresh-courses-event="this.refreshCoursesHandler"
        @search-course-code-event="this.searchCourseCodeHandler"
        @selected-course-event="this.selectedCourseHandler"
    />
    <hr>
    <h3>Val av tillfälle</h3>
    <OccasionTable
        :occasion-arr="occasionArr"
        @refresh-occasions-event="this.refreshOccasionsHandler"
        @selected-occasion-event="this.selectedOccasionHandler"
    />
    <hr>
    <h3>Detaljer av valt alternativ</h3>
    <CourseDetailsBox
        :course="course"
    />
    --> unimplemented. Sorry.
    <!--<OccasionDetailBox v-if="occasion" :occasion="occasion" /> work in progress-->
  </div>
</template>

<script>
import OccasionTable from "@/components/u4/OccasionTable.vue";
import CourseFinderBox from "@/components/u4/CourseFinderBox.vue";
import OccasionDetailBox from "@/components/u4/OccasionDetailBox.vue";
import occasionApiService from "@/service/u4/occasionApiService";
import {OccasionObj} from "@/service/u4/occasionApiService";
import {mapMutations, mapState} from "vuex";
import courseApiService from "@/service/u4/courseApiService";

export default {
  name: "OccasionTab",
  components: {
    CourseFinderBox,
    OccasionTable,
    //OccasionDetailBox
  },
  data() {
    return {
      course: {},
      courseCodeList: [],
      occasion: {}
    };
  },
  computed: {
    ...mapState({
      activeCourseCode: state => state.activeCourseCode,
      occasionArr: state => state.scheduleStore.occasionArr,
      activeOccasionCode: state => state.scheduleStore.activeOccasionCode,
    }),
  },
  methods: {
    // todo: this does not work... seems to be the same issue as mapActions, need to use the (string, [string]) format.
    /*...mapMutations({
      setOccasionArr: state => state.scheduleStore.setOccasionArr,
      setSelectedOccasion: state => state.scheduleStore.setSelectedOccasion,
    }),*/
    ...mapMutations("scheduleStore", ["setOccasionArr", "setActiveOccasionCode"]),

    /* Reload the occasions table. Mostly for testing requests.
     */
    async refreshOccasionsHandler() {
      console.debug("refreshOccasionsHandler() called.");
      const res = await occasionApiService.getOccasionsByCourseCode();
      this.setOccasionArr(res); // mutate store state
    },

    /* Get meta info about an occasion.
     * maybe for a popup or side-panel info window.
     */
    async selectedOccasionHandler(occasionCode) {
      console.debug("selectedOccasionHandler() called.");
      this.setActiveOccasionCode(occasionCode); // mutate store
      const res = await occasionApiService.getOccasion(occasionCode);
      this.occasion = await occasionApiService.getOccasionDetails(res);
    },

    /* Gets metadata from backend for a course.
     * Sets the occasions list depending on course code,
     * todo: should consolidate metadata and details.
     */
    async selectedCourseHandler(courseCode) {
      console.debug("selectedCourseHandler() called.");
      this.setOccasionArr(await occasionApiService.getOccasionsByCourseCode(courseCode)); // set in store
      this.course = await courseApiService.getCourseDetails(courseCode); // not implemented
    },

    /* Get just a list of available courses, and then maps just the
     * codes to a local data property. */
    async refreshCoursesHandler() {
      console.debug("refreshCoursesHandler() called.");
      const res = await courseApiService.getCourseCodeList();
      this.courseCodeList = res.map(item => item.id);
    },

    /* Searches for a part or full match case insensitive course code,
     * which is the beginnings of an elastic search implementation
     */
    async searchCourseCodeHandler(searchStr) {
      console.debug("searchCourseCodeHandler() called.");
      //const res = await courseApiService.getCourseCodeList();
      this.courseCodeList = "implementME!";
    }
  }
};
</script>

<style scoped></style>
