<template>
  <div id="occasion-detail-box">
    <h4>Detaljer för {{ occasion.id }}</h4>
    Metadata info: {{ occasion }}
  </div>
</template>

<script>
export default {
  name: "OccasionDetailBox",
  props: {
    occasion: Object
  }
};
</script>

<style scoped>
#occasion-detail-box {
  max-width: 450px;
  padding: 2rem;
  padding-top: 3rem;
}
</style>
