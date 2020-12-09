/* EA & SOA Group 2 HT2020. The idea for this is that it is a "wrapper" component that
includes the "menu" for the schedule management parts */

<template>
  <div class="container" id="schedule-works">
    <OccasionTable
      @refresh-occasions-event="refreshOccasions"
      @select-occasion-event="fetchOccasionDetails"
    />
    <VueCal />
  </div>
</template>

<script>
"use strict";

import { Options, Vue } from "vue-class-component";
import VueCal from "vue-cal";
import OccasionTable from "@/components/u4/OccasionTable.vue";
import "vue-cal/dist/vuecal.css";
import occasionService from "@/service/u4/occasionService";

@Options({
  components: {
    OccasionTable,
    VueCal
  },
  data() {
    return {
      checkedNames: [],
      state: {
        allModulesMode: false // Show or hide the courseCode column in table
      }
    };
  },
  methods: {
    // Reload the occasions table. Mostly for testing requests.
    refreshOccasions() {
      console.log("refreshOccasions() called.");
      return occasionService.getOccasions();
    },
    // Get meta info about an occasion... maybe for a popup or side-panel info window.
    fetchOccasionDetails(occasionCode: string) {
      console.log("fetchOccasionDetails() NOT implemented");
      return occasionService.getOccasionDetails(occasionCode);
    }
  }
})
export default class Home extends Vue {}
</script>

<style></style>
