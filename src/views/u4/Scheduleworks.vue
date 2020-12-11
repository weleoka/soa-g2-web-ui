/* EA & SOA Group 2 HT2020. The idea for this is that it is a "wrapper"
component for schedule management. */

<template>
  <div class="container" id="schedule-works">
    <TabWrapper />
    <OccasionDetailBox v-bind="selectedOccasion" />
  </div>
</template>

<script>
import { Options, Vue } from "vue-class-component";
import TabWrapper from "@/components/u4/tabs/TabWrapper.vue";
import OccasionDetailBox from "@/components/u4/OccasionDetailBox.vue";
import {mapState} from "vuex";

@Options({
  components: {
    TabWrapper,
    OccasionDetailBox,
  },
  computed: {
    ...mapState({
      selectedOccasion: state => state.scheduleStore.selectedOccasion
    })
  }
})
export default class Home extends Vue {}
</script>

<style scoped></style>
