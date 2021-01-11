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
      @edit-event-event="onEditEvent"
      v-if="!isNew && !isForEdit && vcObj && Object.keys(vcObj).length"
      :vcObj="vcObj"
    />
    <EventForm
      v-if="(isNew || isForEdit) && vcObj && Object.keys(vcObj).length"
      :vcObj="vcObj"
    />
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
      vcObj: {}, // working object, new or existing Event.
      isForEdit: false // vcObj is existing and for edit.
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
    ...mapState(["selectedCourse"]),
    //isNotNew: vm => !!vm.vcObj.id, // if id isn't set we assume it's new
    isNew: vm => !vm.vcObj.tmpId // if id isn't set we assume it's new
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
    async onCreateEvent(datetime: Date) {
      Ut.ld(`TimeTab->onCreateEvent`);
      datetime.setMinutes(0); // sets to closest hour.
      datetime.setHours(0); // sets beginning of day.
      this.vcObj = new Event(datetime); // create new event with start midnight.
    },
    async onSelectEvent(vcObj) {
      Ut.ld(`TimeTab->onSelectEvent`);
      // get the original event instance back from eventArr.
      this.vcObj = this.eventArr.find(obj => {
        return obj.tmpId === vcObj.tmpId;
      });
      Ut.pp(this.vcObj instanceof Event);
    },
    async onEditEvent() {
      Ut.ld(`TimeTab->onEditEvent`);
      this.isForEdit = true;
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

<style scoped></style>
