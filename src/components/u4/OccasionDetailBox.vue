<template>
  <div id="occasion-detail-box" v-if="occasion">
    <h4>Detaljer för {{ occasion.id }}</h4>
    Metadata info: {{ occasion }}
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Occasion } from "@/service/types";

@Options({
  name: "OccasionDetailBox",
  props: {
    occasion: Occasion
  }
})
export default class OccasionDetailBox extends Vue {}
</script>

<style scoped>
#occasion-detail-box {
  max-width: 450px;
  padding: 3rem 2rem 2rem;
}
</style>
