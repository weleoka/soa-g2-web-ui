/* EA & SOA Group 2 HT2020. The idea for this is that it is a "wrapper" component that
includes the "menu" for the schedule management parts */
<template>
  <div id="home">
    <OccasionTable />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

import { mapActions } from "vuex";
import OccasionTable from "@/components/u4/OccasionTable.vue";

@Options({
  components: {
    OccasionTable
  },
  methods: {
    ...mapActions([]), // remove
    getModuleDetails(moduleId: string) {
      console.log("select-module-event triggered data: " + moduleId);
      this.$router.push({ name: "moduleview", params: { moduleId } });
      // The above translates to being the same as:
      //this.$router.push({ name: "moduleview", params: { moduleId: moduleId } });
    }
  }
})
export default class Home extends Vue {}
</script>

<style></style>
