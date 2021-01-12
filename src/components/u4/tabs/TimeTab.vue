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
      <button class="btn-a" type="button" @click="onRefreshSchedule">
        Hämta schema
      </button>
    </div>
    <br />
    <EventCalendarBox
      v-if="!state.loading"
      :time-slots="timeSlots"
      @create-event-event="onCreateEvent"
      @select-event-event="onSelectEvent"
    />
    <p v-if="state.loading">Loading...</p>
    <p v-if="state.error">Error!</p>
    <hr />
    <EventDetailBox
      @start-event-edit-event="onStartEventEdit"
      v-if="selectedEvent && Object.keys(selectedEvent).length"
      :vcObj="selectedEvent"
    />
    <EventForm
      v-if="formEvent && Object.keys(formEvent).length"
      :formEvent="formEvent"
      @stop-event-edit-event="onStopEventEdit"
    />
    <div v-else class="container-v" id="placeholder-box">-</div>
  </div>
</template>

<script lang="ts">
import EventDetailBox from "@/components/u4/EventDetailBox.vue";
import EventCalendarBox from "@/components/u4/EventCalendarBox.vue";
import EventForm from "@/components/u4/EventForm.vue";
import { mapActions, mapMutations, mapState } from "vuex";
import { Options, Vue } from "vue-class-component";
import { Event } from "@/entities/event";
import { Occasion } from "@/entities/occasion";
import { Course } from "@/entities/course";
import { Ut } from "@/service/utils";

@Options({
  name: "TimeTab",
  components: {
    EventCalendarBox,
    EventDetailBox, // for displaying existing events
    EventForm // modifying or creating events
  },
  data() {
    return {
      state: {
        loading: true,
        error: null
      },
      selectedEvent: {}, // a selected event from vuecal.
      formEvent: {} // set if creating or editing an event
    };
  },
  created() {
    this.onRefreshSchedule();
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
    ...mapActions("scheduleStore", [
      "getScheduleByOccasion",
      "getEventsBySchedule"
    ]),
    ...mapMutations("scheduleStore", [
      "setSelectedSchedule",
      "setSelectedOccasion",
      "setEventArr"
    ]),
    ...mapMutations(["setSelectedCourse"]),
    onCreateEvent(datetime: Date) {
      Ut.ld(`TimeTab->onCreateEvent`);
      if (!Ut.isSet(this.formEvent)) {
        datetime.setMinutes(0); // sets to closest hour.
        datetime.setHours(0); // sets beginning of day.
        this.selectedEvent = {};
        this.formEvent = new Event(datetime); // create new event with start midnight.
      } else {
        // todo: make it possible to dynamically change dates... etc etc etc.
        // the user has to clear the formEvent before interacting with calendar again.
        console.warn("Calendar disabled!");
      }
    },

    /* selects original backend instance by looking in eventArr */
    onSelectEvent(vcEvent) {
      Ut.ld(`TimeTab->onSelectEvent`);
      if (!Ut.isSet(this.formEvent)) {
        this.formEvent = {};
        this.selectedEvent = {};
        this.selectedEvent = this.eventArr.find(obj => {
          return obj.tmpId === vcEvent.tmpId;
        });
        if (!(this.selectedEvent instanceof Event)) {
          console.warn("Event from calendar not found in eventArr!");
        }
      } else {
        console.warn("Calendar disabled!");
      }
    },

    /* Sets the formElement from the data from existing event */
    onStartEventEdit() {
      Ut.ld(`TimeTab->onEditEvent`);
      this.formEvent = Object.assign(new Event(), this.selectedEvent);
      this.selectedEvent = {};
      if (!(this.formEvent instanceof Event)) {
        // todo: implement sensible check
        console.warn("Event form set with incompatible Event instance");
      }
    },

    /* Clears the selected and form events */
    onStopEventEdit() {
      Ut.ld(`TimeTab->onStopEditEvent`);
      this.selectedEvent = {};
      this.formEvent = {};
    },

    /* Fetches a schedule and other required data */
    async onRefreshSchedule() {
      Ut.ld(`TimeTab->onRefreshSchedule()`);
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
    }
  }
})
export default class TimeTab extends Vue {}
</script>

<style scoped>
#placeholder-box {
  height: 331px;
  max-height: 331px;
}
</style>
