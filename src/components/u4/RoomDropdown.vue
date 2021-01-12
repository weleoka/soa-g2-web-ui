<template>
  <select @change="$emit('selection-event', this.selected)" v-model="selected"
    ><option v-for="(option, i) in options" :key="i" v-bind:value="option.id">
      {{ option.text }}
    </option>
  </select>
</template>

<script lang="ts">
import { mapState } from "vuex";
import { Options, Vue } from "vue-class-component";

@Options({
  name: "RoomDropdown",
  props: {
    preselected: String
  },
  emits: ["selection-event"],
  data() {
    return {
      selected: "",
      options: []
    };
  },
  computed: mapState("bookingStore", ["roomArr"]),
  beforeMount() {
    for (let i = 1; i < Object.keys(this.roomArr).length + 1; i++) {
      const room = this.roomArr[`${i}`];
      this.options.push({
        text: `${room.roomCode} - ${room.description}`,
        id: room.id
      });
    }
  },
  methods: {
    //nearestTimeSlot: datetime => -1 // todo: select timeslot matching incoming datetime.
  }
})
export default class RoomDropdown extends Vue {}
</script>

<style scoped></style>
