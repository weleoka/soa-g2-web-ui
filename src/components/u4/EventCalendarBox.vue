<template>
  <div class="container-v">
    <div class="container-v" id="work-zone">
      <div v-if="selectedEvent && Object.keys(selectedEvent).length">
        <p>Selected event: {selectedEvent}</p>
      </div>
      <div v-if="newEvent && Object.keys(newEvent).length">
        <p>New event: {newEvent}</p>
      </div>
    </div>
    <div id="calendar-wrapper">
      <VueCal
        ref="vueCal"
        active-view="month"
        :disable-views="['years', 'year', 'day']"
        locale="sv"
        :selected-date="selectedDate"
        :cell-click-hold="false"
        :drag-to-create-event="false"
        :time-from="8 * 60"
        :time-to="20 * 60"
        :time-step="60"
        :special-hours="timeSlots"
        :on-event-click="onEventClick"
        @cell-focus="onCellFocus($event)"
        :events="eventArr"
      />
    </div>
  </div>
</template>

<script lang="ts">
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import "vue-cal/dist/i18n/sv";
import { Options, Vue } from "vue-class-component";
import { mapState } from "vuex";
import { Event } from "@/entities/event";

@Options({
  name: "EventCalendarBox",
  components: {
    VueCal
  },
  props: {
    timeSlots: Object // used as special-hours property for vue-cal
  },
  emits: ["cell-clicked-event"],
  data() {
    return {
      selectedDate: {}, // default centering of calendar
      selectedEvent: {},
      newEvent: {} // set when clicking empty part in calendar
    };
  },
  computed: {
    ...mapState("scheduleStore", ["eventArr"])
  },
  methods: {
    logEvents(str, event) {
      console.debug("Event: " + str + event);
    },
    onCellFocus(datetime) {
      console.log("Cell focus event");
      console.log(`Date is date: ${datetime instanceof Date}`);
      this.selectedEvent = null;
      this.newEvent = new Event(datetime);
    },
    onEventClick(event, e) {
      console.log("Event clicked");
      console.log(JSON.stringify(event));
      this.selectedEvent = event;
      // Prevent navigating to narrower view (default vue-cal behavior).
      e.stopPropagation();
    }
  },
  created() {
    this.selectedDate = new Date("2020-10-15"); //.getDate();
    console.log(JSON.stringify(this.eventArr));
    console.log("asdfasdfasdf" + (this.eventArr[0].start instanceof Date));
  }
})
export default class EventCalendarBox extends Vue {}
</script>

<style scoped>
#calendar-wrapper {
  height: 650px;
}

#work-zone {
  height: 200px;
}
</style>
