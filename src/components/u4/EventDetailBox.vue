<template>
  <div class="container-v" id="event-detail-box">
    <div>
      <h4>Detaljer för lektionen {{ vcObj.start.format("dddd DD MMMM") }}</h4>
      <span
        >{{ vcObj.start.formatTime("HH:mm") }} -
        {{ vcObj.end.formatTime("HH:mm") }}</span
      >
    </div>
    <div>
      <ul>
        <li>{{ vcObj.location }}</li>
        <li>{{ vcObj.contactName }}</li>
        <li>{{ vcObj.distanceUrl }}</li>
      </ul>
    </div>
    <div>
      <button class="btn-a" @click="$emit('start-event-edit-event', vcObj)">
        Ändra uppgifter
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { mapState } from "vuex";

@Options({
  name: "EventDetailBox",
  components: {},
  emits: ["start-event-edit-event"],
  props: {
    vcObj: {} // expects a vue-cal event object only.
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
  padding: inherit;
  overflow: auto;
  text-overflow: clip;
  height: 331px;
  max-height: 331px;
}
</style>
