/* EA & SOA Group 2 HT2020. The idea for this is that it is a "wrapper"
component for schedule management. */

<template>
  <div class="container" id="schedule-works">
    <TabBar />
  </div>
</template>

<script>
import { Options, Vue } from "vue-class-component";
import TabBar from "@/components/u4/tabs/TabBar.vue";

@Options({
  components: {
    TabBar,
  },
  computed: {
  }
})
export default class Home extends Vue {}
</script>

<style scoped></style>
