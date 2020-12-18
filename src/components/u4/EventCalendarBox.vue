<template>
  <div class="container-v">
    <div id="calendar-wrapper">
      <VueCal
        ref="vueCal"
        active-view="month"
        :disable-views="['years', 'year', 'day']"
        locale="sv"
        hide-weekends
        :cell-click-hold="false"
        :drag-to-create-event="false"
        hide-title-bar
        :time-from="8 * 60"
        :time-to="20 * 60"
        :time-step="30"
        :special-hours="timeSlots"
        @ready="logEvents('ready', $event)"
        @view-change="logEvents('view-change', $event)"
        @cell-click="cellClickHandler('cell-click', $event)"
        @cell-dblclick="logEvents('cell-dblclick', $event)"
        @cell-contextmenu="logEvents('cell-contextmenu', $event)"
        @cell-focus="logEvents('cell-focus', $event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import "vue-cal/dist/i18n/sv";
import { Options, Vue } from "vue-class-component";

@Options({
  name: "EventCalendarBox",
  components: {
    VueCal
  },
  props: {
    timeSlots: Object
  },
  methods: {
    logEvents(str, event) {
      console.debug("Event: " + str + event);
    },
    cellClickHandler(str, datetime) {
      console.debug("Event: " + str + "AAA " + datetime);
      this.$emit("cell-clicked-event", datetime);
    }
  }
})
export default class EventCalendarBox extends Vue {}
</script>

<style scoped>
#calendar-wrapper {
  height: 500px;
}
</style>
