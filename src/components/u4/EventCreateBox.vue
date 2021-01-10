<template>
  <div class="container-v" id="create-event-box">
    <h3>Ny lektion</h3>
    <div
      v-if="newEvent && !Object.keys(newEvent).length"
      id="new-event-detail-box"
    >
      <h4>Detaljer för eventet {{ newEvent.id }}</h4>
      Metadata info: {{ newEvent.datetime.toDateString() }}
    </div>
    <div>
      Här så måste vi välja pass och annat roligt skoj.
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Event } from "@/entities/event";

@Options({
  name: "EventCreateBox",
  props: {
    newEvent: Event
  }
})
export default class EventCreateBox extends Vue {}
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
