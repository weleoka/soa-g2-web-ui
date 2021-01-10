<template>
  <div>
    <h1>Steg 2: välj lektionstider</h1>
    <div
      class="container-v"
      v-if="!selectedSchedule && !Object.keys(selectedSchedule).length"
    >
      <p>Hämta schemat för aktuellt kurstillfälle</p>
      <button class="btn-a" type="button" @click="refreshScheduleHandler">
        Hämta schema
      </button>
    </div>
    <br />
    <EventCalendarBox
      v-if="!state.loading"
      :time-slots="timeSlots"
      @cell-clicked-event="cellClickedHandler"
    />
    <p v-if="state.loading">Loading...</p>
    <p v-if="state.error">Error!</p>
    <hr />
    <!--    <EventCreateBox
      v-if="newEvent"
      :new-event="newEvent"
    />-->
  </div>
</template>

<script lang="ts">
import EventCreateBox from "@/components/u4/EventCreateBox.vue";
import EventCalendarBox from "@/components/u4/EventCalendarBox.vue";
import eventService from "@/service/u4/eventService";
import scheduleService from "@/service/u4/scheduleService";
import { mapMutations, mapState } from "vuex";
import { Options, Vue } from "vue-class-component";
import { Occasion } from "@/entities/occasion";
import { Schedule } from "@/entities/schedule";
import { Event } from "@/entities/event";

@Options({
  name: "TimeTab",
  components: {
    EventCalendarBox,
    EventCreateBox
  },
  data() {
    return {
      state: {
        loading: true,
        error: null
      },
      newEvent: {} // the unverified and under creation event
    };
  },
  //mounted() {
  created() {
    this.refreshScheduleHandler();
  },
  computed: {
    ...mapState("scheduleStore", [
      "selectedSchedule",
      "selectedOccasion",
      "timeSlots"
    ])
  },
  methods: {
    ...mapMutations("scheduleStore", [
      "setSelectedSchedule",
      "setSelectedOccasion",
      "setEventArr"
    ]),
    /* Creates a new event
     * - round off datetime to nearest day: no we dont have to bother now.
     * - jump to other event creation sections
     * - set the title, content and class attributes
     * - get the equipment, teacher and room attributes
     * - repetition, week exclusion and variations for "burst" creation
     */
    async createEvent(datetime: Date) {
      this.newEvent = new Event(datetime);
      return await eventService.createNewEvent(this.newEvent);
    },

    /* Refresh schedule and events objects */
    async refreshScheduleHandler() {
      console.debug(`TimeTab->refreshScheduleHandler()`);
      this.state.loading = true;
      this.setSelectedOccasion(new Occasion("15")); // FOR TESTING! REMOVE LATER!
      const schedule = await this.getScheduleByOccasion(this.selectedOccasion);
      if (schedule && Object.keys(schedule).length) {
        this.setSelectedSchedule(schedule);
        //console.log(`Events are events: ${schedule.events[0] instanceof Event}`);
        //console.log(`RESERVATIONS2: ${schedule.reservations2.map(reser => JSON.stringify(reser))}`);
        //const eventsArr = await this.getEventsBySchedule(schedule); // preferred fetching separately?
        if (schedule.events) {
          console.debug(`Events count: ${schedule.events.length}`);
          this.setEventArr(schedule.events);
        } else {
          console.warn(`No events found for schedule`);
        }
      } else {
        throw Error(
          `Schedule for occasion: ${this.selectedOccasion.id} not found or bad data!`
        );
      }
      this.state.loading = false;
      return true;
    },

    /* get single schedule for a course occasion */
    async getScheduleByOccasion(occasion: Occasion): Promise<Schedule> {
      console.debug(`TimeTab->getScheduleByOccasion()`);
      try {
        return await scheduleService.getScheduleByOccasionUsingPathVar(
          occasion
        );
      } catch (e) {
        if (e.name === "ApiError") {
          console.warn(`ApiError ${e.message}`);
        } else {
          console.warn(`Error ${e.message}`);
        }
      }
      return null;
    },

    /* get events by schedule */
    async getEventsBySchedule(schedule: Schedule): Promise<Array<Event>> {
      console.debug(`TimeTab->getEventsBySchedule()`);
      try {
        return await eventService.getEventsBySchedule(schedule);
      } catch (e) {
        if (e.name === "ApiError") {
          console.warn(`ApiError ${e.message}`);
        } else {
          console.warn(`Error ${e.message}`);
        }
      }
      return [];
    },

    /* Processing the big click! */
    async cellClickedHandler(datetime: Date) {
      await this.createEvent(datetime);
    }
  }
})
export default class TimeTab extends Vue {}

/*
this.$refs.vueCal.createEvent(datetime, 90, {
title: "New Event",
content: "yay! 🎉",
class: "blue-event"
});*/
</script>

<style scoped></style>

/* /* load the schedule depending on course occasion */ async
getScheduleBySelectedOccasion() { //const sched = await
scheduleService.getScheduleByOccasion(this.selectedOccasion)[0]; // good const
res = await scheduleService.getScheduleByOccasion( new Occasion("tillfalle03")
// artificially setting occasion. );
console.debug("TimeTab->getScheduleBySelectedOccasion(): " + res[0].id);
this.setSelectedSchedule(res[0]); }, */
