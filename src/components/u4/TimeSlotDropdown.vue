<template>
  <div>
    <label>
      Tidspass:
      <select
        @change="$emit('selection-event', this.selected)"
        v-model="selected"
        ><option
          v-for="(option, i) in options"
          :key="i"
          v-bind:value="option.id"
        >
          {{ option.text }}
        </option>
      </select>
    </label>
  </div>
</template>

<script lang="ts">
import { mapState } from "vuex";
import { Options, Vue } from "vue-class-component";
import { Ut } from "@/service/utils";

@Options({
  name: "TimeSlotDropdown",
  props: {
    preselected: String,
    datetime: Date // used for preselecting timeslot
  },
  emits: ["selection-event"],
  data() {
    return {
      selected: "",
      options: []
    };
  },
  computed: mapState("scheduleStore", ["timeSlots"]),
  beforeMount() {
    for (let i = 1; i < Object.keys(this.timeSlots).length + 1; i++) {
      const slot = this.timeSlots[`${i}`];
      const startStr: string = Ut.minutesToHoursAndMinutes(slot.from);
      const endStr: string = Ut.minutesToHoursAndMinutes(slot.to);
      this.options.push({
        text: `${i}: ${startStr} - ${endStr}`,
        id: i
      });
    }
  },
  methods: {
    //nearestTimeSlot: datetime => -1 // todo: select timeslot matching incoming datetime.
  }
})
export default class TimeSlotDropdown extends Vue {}
</script>

<style scoped></style>
