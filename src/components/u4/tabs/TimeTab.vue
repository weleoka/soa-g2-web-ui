<template>
  <div>
    <h1>Steg 2: välj lektionstider</h1>
    <br>
    <CalendarBox
      @cell-selected-event="this.cellSelectedHandler"
      :time-slots="timeSlots"
    />
    <hr/>
    <CreateEventBox
      :new-event="newEvent"
      :time-slots="timeSlots"
    />
  </div>
</template>

<script>
import CreateEventBox from "@/components/u4/CreateEventBox.vue";
import CalendarBox from "@/components/u4/CalendarBox.vue";

export default {
  name: "TimeTab",
  components: {
    CalendarBox,
    CreateEventBox
  },
  data() {
    return {
      /* Time slots:
          08.15 - 09.45: 1.5h
          10.15 - 11.45: 1.5h
          13.00 - 14.30: 1.5h
          14.45 - 16.15: 1.5h
          16.30 - 18.00: 1.5h */
      timeSlots: {
        1: { from: (9 * 60) + 15, to: (9 * 60) + 45, class: 'slot-1' },
        2: { from: (10 * 60) + 15, to: (11 * 60) + 45, class: 'slot-2' },
        3: { from: (13 * 60), to: (14 * 60) + 30, class: 'slot-3' },
        4: { from: (14 * 60) + 45, to: (16 * 60) + 45, class: 'slot-4' },
        5: { from: (16 * 60) + 35, to: (18 * 60), class: 'slot-5' }
      },
      newEvent: {},
    }
  },
  methods: {
    cellSelectedHandler(cellId) {
      console.debug("There's been a cell clicked!");
    }
  }
};
</script>

<style scoped>

</style>
