 <template>
  <div>
    <h1>Steg 2: välj lektionstider</h1>
    <div class="container-v" v-if="schedule">
      <p>Hämta schemat för aktuellt kurstillfälle</p>
      <button class="btn-a" type="button" @click="refreshScheduleHandler">
        Hämta schema
      </button>
    </div>
    <br />
    <EventCalendarBox
      v-if="!loading"
      :time-slots="timeSlots"
      @cell-clicked-event="cellClickedHandler"
    />
    <p v-if="loading">Loading...</p>
    <p v-if="error">Error!</p>
    <hr />
<!--    <EventCreateBox
      v-if="newEvent"
      :new-event="newEvent"
    />-->
  </div>
</template>

<script lang="ts">
import EventCreateBox from "@/components/u4/EventCreateBox.vue";
import EventCalendarBox from "@/components/u4/EventCalendarBox.vue";
import eventService from "@/service/u4/eventService";
import scheduleService from "@/service/u4/scheduleService";
import {mapMutations, mapState} from "vuex";
import {Options, Vue} from "vue-class-component";
import {Occasion} from "@/service/types";
import {Event} from "@/service/types";

@Options({
  name: "TimeTab",
  components: {
    EventCalendarBox,
    EventCreateBox
  },
  data() {
    return {
      state: {
        loading: true,
        error: null
      },
      newEvent: {} // the unverified and under creation event
    };
  },
  //mounted() {
  created() {
    this.refreshScheduleHandler();
  },
  computed: {
    ...mapState("scheduleStore", ["selectedSchedule", "selectedOccasion", "timeSlots"]),
    ...mapMutations("scheduleStore", ["setSelectedSchedule", "setEventArr"])
  },
  methods: {
    /* Creates a new event
    * - round off datetime to nearest day: no we dont have to bother now.
    * - jump to other event creation sections
    * - set the title, content and class attributes
    * - get the equipment, teacher and room attributes
    * - repetition, week exclusion and variations for "burst" creation
    */
    async createEvent(datetime: Date) {
      this.newEvent = new Event(datetime);
      //
      return await eventService.createNewEvent(this.newEvent);
    },

    /* Refresh schedule and events objects */
    async refreshScheduleHandler() {
      this.state.loading = true;
      await this.loadSchedule();
      await this.loadEvents();
      this.state.loading = false;
    },

    /* load the schedule depending on course occasion */
    async loadSchedule() {
      //this.schedule = await scheduleService.getScheduleByOccasion(this.selectedOccasion); // good
      this.setSelectedSchedule = await scheduleService.getScheduleByOccasion(
        new Occasion("tillfalle03") // artificially setting occasion.
      );
    },

    /* load events, requires a schedule to be set */
    async loadEvents() {
      if (this.selectedSchedule) {
        this.setEventArr = await eventService.getEventsBySchedule(this.selectedSchedule);
      }
    },

    /* Processing the big click! */
    async cellClickedHandler(datetime: Date) {
      await this.createEvent(datetime)
    }
  }
})
export default class TimeTab extends Vue {}

/*
this.$refs.vueCal.createEvent(datetime, 90, {
title: "New Event",
content: "yay! 🎉",
class: "blue-event"
});*/
</script>

<style scoped></style>


