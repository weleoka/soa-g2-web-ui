<template>
  <div class="container-v" id="event-detail-box">
    <div>
      <p>Ändra lektionen {{ vcObj.start.format("dddd DD MMMM") }}</p>
      <span
        >{{ vcObj.start.formatTime("HH:mm") }} -
        {{ vcObj.end.formatTime("HH:mm") }}</span
      >
      <br />
      <p>{{ vcObj.location }}</p>
      <p>{{ vcObj.contactName }}</p>
      <p>{{ vcObj.distanceUrl }}</p>
      <p>{{ vcObj.description }}</p>
    </div>
    <button @click="$emit('edit-event-event', vcObj)">Init</button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Event } from "@/entities/event";
import { mapState } from "vuex";

@Options({
  name: "EventDetailBox",
  components: {},
  emits: ["edit-event-event"],
  props: {
    vcObj: {
      type: Event,
      default: null,
      required: true
    }
  },
  computed: {
    ...mapState("scheduleStore", ["timeSlots"])
  },
  methods: {}
})
export default class EventDetailBox extends Vue {}
</script>

<style scoped>
#event-detail-box {
  height: 150px;
  max-width: 450px;
  padding: 3rem 2rem 2rem;
}
</style>
