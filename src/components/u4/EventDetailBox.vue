<template>
  <div class="container-v" id="event-detail-box">
    <div v-if="!isNew && wob && Object.keys(wob).length">
      <p>Ändra lektionen {{ wob.start.format("dddd DD MMMM") }}</p>
      <span
        >{{ wob.start.formatTime("HH:mm") }} -
        {{ wob.end.formatTime("HH:mm") }}</span
      >
      <br />
      <p>{{ wob.location }}</p>
      <p>{{ wob.contactName }}</p>
      <p>{{ wob.distanceUrl }}</p>
      <p>{{ wob.description }}</p>
    </div>
    <div v-if="isNew && wob && Object.keys(wob).length">
      <p>Skapa lektion på {{ wob.start.format("dddd DD MMMM") }}</p>
      <p>Klicka på nästa</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Event } from "@/entities/event";

@Options({
  name: "EventCreateBox",
  props: {
    wob: {
      // working object
      type: Event,
      default: null
    }
  },
  computed: {
    //isNotNew: vm => !!vm.wob.id, // if id isn't set we assume it's new
    isNew: vm => !vm.wob.tmpId // if id isn't set we assume it's new
  }
})
export default class EventCreateBox extends Vue {}
</script>

<style scoped>
#event-detail-box {
  height: 150px;
  max-width: 450px;
  padding: 3rem 2rem 2rem;
}
</style>
