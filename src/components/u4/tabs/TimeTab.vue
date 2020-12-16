<template>
  <div>
    <h1>Steg 2: välj lektionstider</h1>
    <br>
    <EventCalendarBox
      :time-slots="timeSlots"
      @cell-clicked-event="this.cellClickedHandler"
    />
    <hr/>
    <EventCreateBox
      :new-event="newEvent"
      :time-slots="timeSlots"
    />
  </div>
</template>

<script>
import CreateEventBox from "@/components/u4/CreateEventBox.vue";
import CalendarBox from "@/components/u4/CalendarBox.vue";
import eventApiService from "@/service/u4/eventApiService";

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
    customEventCreation(datetime) {
      // round off datetime to nearest day
      // jump to other event creation sections
      // set the title, content and class attributes
      // get the equipment, teacher and room attributes
      // repetition, week exclusion and variations for "burst" creation
      this.$refs.vueCal.createEvent(
          datetime,
          90,
          { title: 'New Event', content: 'yay! 🎉', class: 'blue-event' }
      )
      eventApiService.createNewEvent(this.newEvent)
    },
  }
};
</script>

<style scoped>

</style>
