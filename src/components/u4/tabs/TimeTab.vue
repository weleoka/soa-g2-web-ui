<template>
  <div>
    <div class="container tab-main-header">
      <h1>
        Steg 2: välj tid eller lektion
        <small>({{ selectedCourse.id }})</small>
      </h1>
      <button
        v-if="Ut.isSet(selectedCourse)"
        id="show-hide-cal-btn"
        class="btn-a"
        type="button"
        @click="state.showCal = !state.showCal"
      >
        {{ state.showCal ? "Dölj kalender" : "Visa kalender" }}
      </button>
    </div>

    <div class="calender-wrapper">
      <div
        class="container-v"
        v-if="Ut.isNotSet(selectedSchedule) && Ut.isSet(selectedOccasion)"
      >
        <p>Hämta schemat för aktuellt kurstillfälle</p>
        <button class="btn-a" type="button" @click="onRefreshSchedule">
          Hämta schema
        </button>
      </div>
      <div
        class="container-v"
        v-if="Ut.isNotSet(selectedSchedule) && Ut.isNotSet(selectedOccasion)"
      >
        <p>Inget kurstillfälle har valts ännu.</p>
        <button
          class="btn-a"
          type="button"
          @click="$emit('go-direct-event', 0)"
        >
          Välj kurstillfälle
        </button>
      </div>

      <transition name="fade">
        <div>
          <EventCalendarBox
            v-if="!state.loading && state.showCal"
            :time-slots="timeslots"
            @create-event-event="onCreateEvent"
            @select-event-event="onSelectEvent"
          />
        </div>
      </transition>
      <div v-if="state.loading">Loading...</div>
      <div v-if="fb.error">Error!</div>
    </div>

    <div class="event-manipulations-wrapper">
      <EventDetailBox
        @start-event-edit-event="onStartEventEdit"
        v-if="Ut.isSet(selectedEvent)"
        :vcObj="selectedEvent"
      />
      <EventForm
        v-if="formEvent && Object.keys(formEvent).length"
        :formEvent="formEvent"
        @stop-event-edit-event="onStopEventEdit"
        @form-submit-event="onFormSubmitEvent"
      />
      <div
        v-if="Ut.isSet(formEvent) && Ut.isNotSet(selectedEvent)"
        id="placeholder-box"
      >
        Fortsätt genom att välja tid eller befintlig lektion i kalendern.
        {{ msg.success }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import EventDetailBox from "@/components/u4/EventDetailBox.vue";
import EventCalendarBox from "@/components/u4/EventCalendarBox.vue";
import EventForm from "@/components/u4/EventForm.vue";
import { mapActions, mapMutations, mapState } from "vuex";
import { Options, Vue } from "vue-class-component";
import { Event } from "@/entities/event";
import { Ut } from "@/service/utils";
import eventService from "@/service/u4/eventService";

@Options({
  name: "TimeTab",
  components: {
    EventCalendarBox,
    EventDetailBox, // for displaying existing events
    EventForm // modifying or creating events
  },
  emits: ["go-direct-event"], // this is to switch tabs directly.
  data() {
    return {
      Ut,
      state: {
        showCal: false,
        loading: false
      },
      fb: {
        // Feedback to user
        error: "",
        success: ""
      },
      selectedEvent: {}, // a selected event from vuecal.
      formEvent: {} // set if creating or editing an event
    };
  },
  computed: {
    ...mapState("scheduleStore", [
      "selectedSchedule",
      "selectedOccasion",
      "timeslots",
      "eventArr"
    ]),
    ...mapState(["selectedCourse"])
  },
  methods: {
    ...mapActions("bookingStore", ["refreshResources", "refreshRooms"]),
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
      console.log(`TimeTab->onCreateEvent`);
      if (!Ut.isSet(this.formEvent)) {
        datetime.setMinutes(0); // sets to closest hour.
        datetime.setHours(0); // sets beginning of day.
        this.selectedEvent = {};
        this.formEvent = new Event(datetime); // create new event with start midnight.
        this.formEvent.title = "Lektion";
      } else {
        // todo: make it possible to dynamically change dates... etc etc etc.
        // the user has to clear the formEvent before interacting with calendar again.
        console.warn("Calendar disabled!");
        alert("Avsluta redigeringen för att använda kalendern.");
      }
    },

    /* selects original backend instance by looking in eventArr */
    onSelectEvent(vcEvent) {
      console.log(`TimeTab->onSelectEvent`);
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
        alert("Avsluta redigeringen för att aktivera kalender.");
      }
    },

    /* Sets the formElement from the data from existing event */
    onStartEventEdit() {
      console.log(`TimeTab->onEditEvent`);
      this.formEvent = Object.assign(new Event(), this.selectedEvent);
      this.selectedEvent = {};
      if (!(this.formEvent instanceof Event)) {
        // todo: implement sensible check
        console.warn("Event form set with incompatible Event instance");
      }
    },

    /* Handles a submitted form */
    async onFormSubmitEvent(formData) {
      console.log(`TimeTab->onFormSubmitEvent`);
      const newEvent = { ...new Event(), ...formData };
      const res = await eventService.createEvent(
        newEvent,
        this.selectedOccasion
      );
      // Check it is a response object
      if (Ut.isSet(res)) {
        console.log(Ut.pf(res));
        // Checks to ensure it's a genuine success
      }
      if (res.id) {
        this.selectedEvent = {};
        this.formEvent = {};
        this.fb.success(`Glada tider - vi har en ny lektion!`);
        setInterval(() => (this.fb.success = ""), 2000);
      }
    },

    /* Clears the selected and form events */
    onStopEventEdit() {
      console.log(`TimeTab->onStopEditEvent`);
      this.selectedEvent = {};
      this.formEvent = {};
    },

    /* Fetches a schedule and other required data */
    async onRefreshSchedule() {
      console.log(`TimeTab->onRefreshSchedule()`);
      this.state.loading = true;
      //this.setSelectedCourse(new Course("D0031N")); // todo: FOR TESTING! REMOVE LATER!
      //this.setSelectedOccasion(new Occasion("15")); // todo: FOR TESTING! REMOVE LATER!
      const schedule = await this.getScheduleByOccasion(this.selectedOccasion);
      this.refreshResources(); // could be called somewhere else perhaps
      this.refreshRooms(); // could be called somewhere else perhaps
      if (Ut.isSet(schedule)) {
        this.setSelectedSchedule(schedule);
        this.setEventArr(schedule.events);
      } else {
        throw Error(
          `Schedule for occasion: ${this.selectedOccasion.id} not found or bad data!`
        );
      }
      this.state.loading = false;
      this.state.showCal = true;
      return true;
    }
  },
  created() {
    console.log(`TimeTab->created()`);
    //this.onRefreshSchedule();
  }
})
export default class TimeTab extends Vue {}
</script>

<style scoped>
#placeholder-box {
  height: 331px;
  max-height: 331px;
}

#show-hide-cal-btn {
  float: left;
}

.tab-main-header {
  justify-content: space-between;
}

.calender-wrapper {
  justify-content: space-around;
  overflow: auto;
  height: 501px;
  max-height: 501px;
  padding: inherit;
}

.event-manipulations-wrapper {
  padding: 1em;
}
</style>
