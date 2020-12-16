<template>
  <div class="container-v" id="create-event-box">
    <h3>Ny lektion</h3>
    <div
      v-if="event"
      id="event-detail-box"
    >
      <h4>Detaljer för eventet {{ event.id }}</h4>
      Metadata info: {{ event }}
    </div>
    <div>
      Här så måste vi välja pass och annat roligt skoj.
    </div>
  </div>
</template>

<script>
export default {
  name: "EventCreateBox",
  props: {
    timeSlots: Object,
    event: Object
  }
};
</script>

<style scoped>
#create-event-box {
  max-height: 400px;
}
#event-detail-box {
  max-width: 450px;
  padding: 3rem 2rem 2rem;
}
</style>
