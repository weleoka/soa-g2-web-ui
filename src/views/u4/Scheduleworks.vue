/* EA & SOA Group 2 HT2020. The idea for this is that it is a "wrapper"
component for schedule management. */

<template>
  <div class="container" id="schedule-works">
    <TabWrapper />
    <OccasionTable
      :occasion-arr="occasionArr"
      @refresh-occasions-event="this.refreshOccasions"
      @fetch-occasion-event="this.fetchOccasion"
    />
    <OccasionDetailBox v-bind="selectedOccasion" />
    <VueCal />
  </div>
</template>

<script>
"use strict";

import { Options, Vue } from "vue-class-component";
import TabWrapper from "@/components/u4/tabs/TabWrapper.vue";
import VueCal from "vue-cal";
import OccasionTable from "@/components/u4/OccasionTable.vue";
import OccasionDetailBox from "@/components/u4/OccasionDetailBox.vue";

import "vue-cal/dist/vuecal.css";
import occasionService from "@/service/u4/occasionService";
import { mapMutations } from "vuex";

@Options({
  components: {
    TabWrapper,
    OccasionTable,
    OccasionDetailBox,
    VueCal
  },
  data() {
    return {
      selectedOccasion: {},
      occasionArr: [],
      state: {
        someKindOfState: false //unused
      }
    };
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
      const res = await occasionService.getOccasions();
      this.occasionArr = res; // 1. set local data to pass aas prop // not needed?
      this.setOccasionArr(res); // 2. set in store
    },

    /* Get meta info about an occasion... maybe for a popup or side-panel info window. */
    async fetchOccasion(occasionCode) {
      console.log("fetchOccasion() called.");
      const res = await occasionService.getOccasionDetails(occasionCode); // hopefully res is only array of one.
      this.selectedOccasion = res[0];
      this.setSelectedOccasion(res[0]); // set in store
    }
  }
})
export default class Home extends Vue {}
</script>

<style scoped></style>
