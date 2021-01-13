<template>
  <select @change="$emit('selection-event', this.selected)" v-model="selected">
    <option>välj tidspass</option>
    <option v-for="(option, i) in options" :key="i" v-bind:value="option.id">
      {{ option.text }}
    </option>
  </select>
</template>

<script lang="ts">
import { mapState } from "vuex";
import { Options, Vue } from "vue-class-component";
import { Ut } from "@/service/utils";

@Options({
  name: "TimeSlotDropdown",
  props: {
    preselected: Number,
    datetime: Date // used for preselecting timeslot (maybe outside logic is better)
  },
  emits: ["selection-event"],
  data() {
    return {
      selected: "",
      options: []
    };
  },
  computed: mapState("scheduleStore", ["timeslots"]),
  beforeMount() {
    for (let i = 1; i < Object.keys(this.timeslots).length + 1; i++) {
      const slot = this.timeslots[`${i}`];
      const startStr: string = Ut.minutesToHoursAndMinutes(slot.from);
      const endStr: string = Ut.minutesToHoursAndMinutes(slot.to);
      this.options.push({
        text: `${startStr} - ${endStr}`,
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
