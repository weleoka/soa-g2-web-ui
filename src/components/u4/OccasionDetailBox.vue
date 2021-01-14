<template>
  <div id="occasion-detail-box" v-if="Ut.isSet(occasion)">
    <h4>Detaljer för valt tillfälle</h4>
    Tillfällekod: {{ occasion.id }} - ({{ occasion.year }})<br />
    Kurskod: {{ occasion.courseCode }}<br />
    Plats: {{ occasion.locationCode }}<br />
    Studieperioder: {{ occasion.periods }}<br />
    Lärare: {{ occasion.teachers[0].first_name }}
    {{ occasion.teachers[0].last_name }}<br />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Occasion } from "@/entities/occasion";
import { Ut } from "@/service/utils";

@Options({
  name: "OccasionDetailBox",
  props: {
    occasion: Occasion
  },
  data() {
    return {
      Ut
    };
  }
})
export default class OccasionDetailBox extends Vue {}
</script>

<style scoped>
.dumpingground {
  max-width: 450px;
}
#occasion-detail-box {
  padding: 3rem 2rem 2rem;
  width: 100%;
}
</style>
