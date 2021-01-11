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
      <p>
        Vill du skapa en lektion på {{ wob.start.format("dddd DD MMMM") }}? Välj
        ett tidspass och klicka sedan på nästa
      </p>
      <TimeSlotDropdown @selection-event="onTimeSlotSelect" />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Event } from "@/entities/event";
import TimeSlotDropdown from "@/components/u4/TimeSlotDropdown.vue";
import { Ut } from "@/service/utils";
import { mapState } from "vuex";

@Options({
  name: "EventCreateBox",
  components: {
    TimeSlotDropdown
  },
  props: {
    // working object
    wob: {
      type: Event,
      default: null
    }
  },
  computed: {
    ...mapState("scheduleStore", ["timeSlots"]),
    //isNotNew: vm => !!vm.wob.id, // if id isn't set we assume it's new
    isNew: vm => !vm.wob.tmpId // if id isn't set we assume it's new
  },
  methods: {
    /* Event handler for when selected Time Slot changes */
    async onTimeSlotSelect(timeSlotId) {
      Ut.ld(`EventDetailBox->onTimeSlotSelect()`);
      Ut.l(timeSlotId);
      const slot = this.timeSlots[timeSlotId];
      const start = Ut.addMinutes(this.wob.start, slot.from);
      const end = Ut.addMinutes(this.wob.start, slot.to);
      this.wob.start = start;
      this.wob.end = end;
    }
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
