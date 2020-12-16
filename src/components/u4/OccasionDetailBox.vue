<template>
  <div id="occasion-detail-box">
    <h3>Detaljer för {{ occasion.id }}</h3>
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
  padding: 1rem;
  padding-top: 2rem;
}
</style>
