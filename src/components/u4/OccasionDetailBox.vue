<template>
  <div>
    Metadata info: {{ occasion.metadata.nestedInfo }}
  </div>
</template>

<script>
import {OccasionObj} from "@/service/u4/occasionApiService";

export default {
  name: "OccasionDetailBox",
  props: {
    occasion: OccasionObj
  }
};
</script>

<style scoped></style>
