<template>
  <div class="container-v">
    <div id="calendar-wrapper">
      <VueCal
        active-view="month"
        :disable-views="['years', 'year', 'day']"
        locale="sv"
        hide-weekends
        :time-from="8 * 60" :time-to="18 * 60" :time-step="90"
        :special-hours="timeSlots"
      />
    </div>
  </div>
</template>

<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import 'vue-cal/dist/i18n/sv'

export default {
  name: "CalendarBox",
  components: {
    VueCal
  },
  props: {
    timeSlots: Object
  }
};
</script>

<style scoped>
#calendar-wrapper {
  height: 500px;
}
</style>
