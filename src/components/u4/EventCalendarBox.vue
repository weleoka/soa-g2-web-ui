<template>
  <div class="container-v">
    <div id="calendar-wrapper">
      <VueCal
        ref="vueCal"
        active-view="week"
        :disable-views="['years', 'year', 'day']"
        locale="sv"
        :selected-date="selectedDate"
        :cell-click-hold="false"
        :drag-to-create-event="false"
        :time-from="9 * 60"
        :time-to="18 * 60"
        :time-step="60"
        :hideWeekends="true"
        :special-hours="timeSlots"
        :on-event-click="onEventClick"
        @cell-click="onCellClick($event)"
        :events="eventArr"
        events-on-month-view="short"
      >
        <!-- https://antoniandre.github.io/vue-cal/#ex&#45;&#45;custom-event-rendering -->
        <template v-slot:event="{ event }">
          <small class="vuecal__event-time">
            <span
              >{{ event.start.formatTime("HH:mm") }} -
              {{ event.end.formatTime("HH:mm") }}</span
            ><br />
          </small>
          <small>
            <!-- Will be added if a content is set -->
            <div class="vuecal__event-content">{{ event.location }}</div>
          </small>
        </template>
      </VueCal>
    </div>
  </div>
</template>

<script lang="ts">
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import "vue-cal/dist/i18n/sv";
import { Options, Vue } from "vue-class-component";
import { mapState } from "vuex";
import { Ut } from "@/service/utils";

@Options({
  name: "EventCalendarBox",
  components: {
    VueCal
  },
  props: {
    timeSlots: Object // used as special-hours property for vue-cal
  },
  emits: ["create-event-event", "select-event-event"],
  data() {
    return {
      selectedDate: {} // default centering of calendar
    };
  },
  computed: {
    ...mapState("scheduleStore", ["eventArr"]),
    ...mapState(["selectedCourse"])
  },
  methods: {
    onEventClick(clickedEvent, e) {
      Ut.ld("Event clicked");
      this.$emit("select-event-event", clickedEvent);
      e.stopPropagation();
    },
    onCellClick(datetime) {
      Ut.ld("Cell clicked");
      this.$emit("create-event-event", datetime);
    }
  },
  created() {
    this.selectedDate = new Date("2020-10-15"); //.getDate();
  }
})
export default class EventCalendarBox extends Vue {}
</script>

<style scoped>
#calendar-wrapper {
  height: 500px;
}
</style>
