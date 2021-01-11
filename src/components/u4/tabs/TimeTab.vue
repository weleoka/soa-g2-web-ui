<template>
  <div>
    <h1>
      Steg 2: välj tid eller lektion <small>({{ selectedCourse.id }})</small>
    </h1>
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
      @create-event-event="onCreateEvent"
      @modify-event-event="onModifyEvent"
    />
    <p v-if="state.loading">Loading...</p>
    <p v-if="state.error">Error!</p>
    <hr />
    <EventDetailBox v-if="wob && Object.keys(wob).length" :wob="wob" />
  </div>
</template>

<script lang="ts">
import EventDetailBox from "@/components/u4/EventDetailBox.vue";
import EventCalendarBox from "@/components/u4/EventCalendarBox.vue";
import eventService from "@/service/u4/eventService";
import scheduleService from "@/service/u4/scheduleService";
import { mapMutations, mapState } from "vuex";
import { Options, Vue } from "vue-class-component";
import { Occasion } from "@/entities/occasion";
import { Schedule } from "@/entities/schedule";
import { Event } from "@/entities/event";
import { Course } from "@/entities/course";
import { Ut } from "@/service/utils";

@Options({
  name: "TimeTab",
  components: {
    EventCalendarBox,
    EventDetailBox
  },
  data() {
    return {
      state: {
        loading: true,
        error: null
      },
      wob: {} // working object, new or existing Event.
    };
  },
  created() {
    this.refreshScheduleHandler();
  },
  computed: {
    ...mapState("scheduleStore", [
      "selectedSchedule",
      "selectedOccasion",
      "timeSlots",
      "eventArr"
    ]),
    ...mapState(["selectedCourse"])
  },
  methods: {
    ...mapMutations("scheduleStore", [
      "setSelectedSchedule",
      "setSelectedOccasion",
      "setEventArr"
    ]),
    ...mapMutations(["setSelectedCourse"]),
    async onCreateEvent(datetime: Date) {
      Ut.l(`TimeTab->onCreateEvent`);
      this.wob = new Event(datetime);
    },
    async onModifyEvent(wob: Event) {
      Ut.l(`TimeTab->onModifyEvent`);
      this.wob = this.eventArr.find(obj => {
        // get the original event instance back.
        return obj.tmpId === wob.tmpId;
      });
    },

    /* Fetches a schedule and other required data */
    async refreshScheduleHandler() {
      console.debug(`TimeTab->refreshScheduleHandler()`);
      this.state.loading = true;
      this.setSelectedCourse(new Course("D0031N")); // todo: FOR TESTING! REMOVE LATER!
      this.setSelectedOccasion(new Occasion("15")); // todo: FOR TESTING! REMOVE LATER!
      const schedule = await this.getScheduleByOccasion(this.selectedOccasion);
      if (schedule && Object.keys(schedule).length) {
        this.setSelectedSchedule(schedule);
        this.setEventArr(schedule.events);
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
    }
  }
})
export default class TimeTab extends Vue {}
</script>

<style scoped></style>
