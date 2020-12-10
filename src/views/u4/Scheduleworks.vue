/* EA & SOA Group 2 HT2020. The idea for this is that it is a "wrapper"
component that includes the "menu" for the schedule management parts */

<template>
  <div class="container" id="schedule-works">
    <OccasionTable
      @refresh-occasions-event="refreshOccasions"
      @fetch-occasion-event="fetchOccasion"
    />
    <OccasionDetailBox v-bind="selectedOccasion" />
    <VueCal />
  </div>
</template>

<script>
"use strict";

import { Options, Vue } from "vue-class-component";
import VueCal from "vue-cal";
import OccasionTable from "@/components/u4/OccasionTable.vue";
import OccasionDetailBox from "@/components/u4/OccasionDetailBox.vue";
import "vue-cal/dist/vuecal.css";
import occasionService from "@/service/u4/occasionService";
import { mapMutations } from "vuex";

@Options({
  components: {
    OccasionTable,
    OccasionDetailBox,
    VueCal
  },
  data() {
    return {
      selectedOccasion: {},
      occasionArr: {},
      state: {
        someKindOfState: false
      }
    };
  },

  methods: {
    // These are all explicitly declared in store. Can't seem to implicitly use them.
    ...mapMutations({
      setSelectedOccasion: state =>
        state.scheduleStoreModule.setSelectedOccasion,
      setOccasionArr: state => state.scheduleStoreModule.setOccasionArr
    }),
    // Reload the occasions table. Mostly for testing requests.
    async refreshOccasions() {
      console.log("refreshOccasions() called.");
      const res = await occasionService.getOccasions();
      this.occasionArr = res;
      await this.$store.dispatch("scheduleStoreModule/setOccasionArr", res); // fails
      //this.setOccasionArr(res); // set in store, fails
    },
    // Get meta info about an occasion... maybe for a popup or side-panel info window.
    async fetchOccasion(occasionCode) {
      console.log("fetchOccasion() called.");
      const res = await occasionService.getOccasionDetails(occasionCode); // hopefully res is only array of one.
      this.selectedOccasion = res[0];
      await this.$store.dispatch("scheduleStoreModule/setOccasionArr", res); // fails
      //this.setSelectedOccasion(res[0]); // set in store, fails
    }
  }
})
export default class Home extends Vue {}
</script>

<style></style>
