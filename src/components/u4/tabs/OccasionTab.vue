<template>
  <div>
    <h1>This is Occasion Tab component</h1>
    <OccasionTable
        :occasion-arr="occasionArr"
        @refresh-occasions-event="this.refreshOccasions"
        @fetch-occasion-event="this.fetchOccasion"
    />
  </div>
</template>

<script>
import OccasionTable from "@/components/u4/OccasionTable.vue";
import occasionApiService from "@/service/u4/occasionApiService";
import {mapMutations, mapState} from "vuex";

export default {
  name: "OccasionTab",
  components: {
    OccasionTable,
  },
  data() {
    return {
      state: {
        someKindOfState: false //unused
      }
    };
  },
  computed: {
    ...mapState({
      occasionArr: state => state.scheduleStore.occasionArr
    })
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
      this.setOccasionArr(res); // set in store
    },

    /* Get meta info about an occasion... maybe for a popup or side-panel info window. */
    async fetchOccasion(occasionCode) {
      console.log("fetchOccasion() called.");
      const res = await occasionApiService.getOccasionDetails(occasionCode); // hopefully res is only array of one.
      this.setSelectedOccasion(res[0]); // set in store
    }
  }
};
</script>

<style scoped></style>
