<template>
  <div id="occasion-detail-box" v-if="occasion && Object.keys(occasion).length">
    <h4>Detaljer för {{ occasion.id }}</h4>
    Metadata info: {{ occasion }}
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Occasion } from "@/entities/occasion";

@Options({
  name: "OccasionDetailBox",
  props: {
    occasion: Occasion
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
