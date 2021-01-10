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
        active-view="week"
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
        events-on-month-view="short"
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
import {Ut} from "@/service/utils";

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
      //bEventArr: [], // this is filled with beautified and fixed events
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
      Ut.ld("Event: " + str + event);
    },
    onCellFocus(datetime) {
      Ut.l("Cell focus event");
      Ut.l(`Date is date: ${datetime instanceof Date}`);
      this.selectedEvent = null;
      this.newEvent = new Event(datetime);
    },
    onEventClick(clickedEvent, e) {
      Ut.l("Event clicked");
      Ut.pp(clickedEvent);
      this.selectedEvent = clickedEvent;
      // Prevent navigating to narrower view (default vue-cal behavior).
      e.stopPropagation();
    },
  },
  created() {
    this.selectedDate = new Date("2020-10-15"); //.getDate();
    Ut.pp(this.eventArr);
    //ut.pp(this.eventArr[0].content());
    //ut.pp(Object.keys(this.eventArr[0]));
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
