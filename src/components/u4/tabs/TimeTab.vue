<template>
  <div>
    <h1>Steg 2: välj lektionstider</h1>
    <div class="container-v" v-if="schedule">
      <p>Hämta schemat för aktuellt kurstillfälle</p>
      <button class="btn-a" type="button" @click="refreshScheduleHandler">
        Hämta schema
      </button>
    </div>
    <br />
    <EventCalendarBox
      v-if="schedule"
      :time-slots="timeSlots"
      @cell-clicked-event="cellClickedHandler"
    />
    <hr />
    <EventCreateBox
      v-if="schedule"
      :new-event="newEvent"
      :time-slots="timeSlots"
    />
  </div>
</template>

<script lang="ts">
import EventCreateBox from "@/components/u4/EventCreateBox.vue";
import EventCalendarBox from "@/components/u4/EventCalendarBox.vue";
import eventApiService from "@/service/u4/eventApiService";
import scheduleApiService from "@/service/u4/scheduleApiService";
import { mapState } from "vuex";
import { Options, Vue } from "vue-class-component";
import { Occasion } from "@/service/types";

@Options({
  name: "TimeTab",
  components: {
    EventCalendarBox,
    EventCreateBox
  },
  data() {
    return {
      schedule: {}, // set once the schedule is loaded from API.
      eventsArr: {},
      timeSlots: {
        1: { from: 9 * 60 + 15, to: 9 * 60 + 45, class: "slot-1" },
        2: { from: 10 * 60 + 15, to: 11 * 60 + 45, class: "slot-2" },
        3: { from: 13 * 60, to: 14 * 60 + 30, class: "slot-3" },
        4: { from: 14 * 60 + 45, to: 16 * 60 + 45, class: "slot-4" },
        5: { from: 16 * 60 + 35, to: 18 * 60, class: "slot-5" }
      },
      newEvent: {}
    };
  },
  computed: {
    ...mapState("scheduleStore", ["selectedSchedule", "selectedOccasion"])
  },
  methods: {
    /* Creates a new event */
    async customEventCreation(datetime) {
      // round off datetime to nearest day
      // jump to other event creation sections
      // set the title, content and class attributes
      // get the equipment, teacher and room attributes
      // repetition, week exclusion and variations for "burst" creation
      this.$refs.vueCal.createEvent(datetime, 90, {
        title: "New Event",
        content: "yay! 🎉",
        class: "blue-event"
      });
      return await eventApiService.createNewEvent(this.newEvent);
    },

    /* Gets a schedule for selected curse occasion */
    async refreshScheduleHandler() {
      //this.schedule = await scheduleApiService.getScheduleByOccasion(this.selectedOccasion); // good
      this.schedule = await scheduleApiService.getScheduleByOccasion(
        new Occasion("tillfalle03")
      ); // testing
    },

    /* Processing the big click! */
    async cellClickedHandler(cellData) {
      console.debug(cellData);
    }
  }
})
export default class TimeTab extends Vue {}
</script>

<style scoped></style>
