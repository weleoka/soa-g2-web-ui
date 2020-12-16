<template>
  <div id="occasion-detail-box">
    <h3>Valt kurstillfälle: {{ occasion.id }}</h3>
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
  width: 450px;
  padding: 1rem;
}
</style>
