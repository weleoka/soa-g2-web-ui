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
      <TimeSlotDropdown
        :datetime="wob.start"
        @selection-event="onTimeSlotSelect"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Event } from "@/entities/event";
import TimeSlotDropdown from "@/components/u4/TimeSlotDropdown.vue";
import { Ut } from "@/service/utils";

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
    //isNotNew: vm => !!vm.wob.id, // if id isn't set we assume it's new
    isNew: vm => !vm.wob.tmpId // if id isn't set we assume it's new
  },
  methods: {
    /* Event handler for when selected Time Slot changes */
    async onTimeSlotSelect(timeSlot) {
      Ut.ld(`EventDetailBox->onTimeSlotSelect()`);
      //const start = Ut.addMinutes(this.datetime, slot.from);
      //const end = Ut.addMinutes(this.datetime, slot.end);
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
