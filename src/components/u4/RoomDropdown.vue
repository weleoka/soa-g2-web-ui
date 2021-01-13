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
    preselected: Number
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
    for (let i = 0; i < this.roomArr.length; i++) {
      const room = this.roomArr[i];
      try {
        this.options.push({
          text: `${room.roomCode} - ${room.description}`,
          id: room.id
        });
      } catch (e) {
        if (e.name === "TypeError") {
          console.warn(`Bad ur missing Room info: ${e.message}`);
        }
      }
    }
  },
  methods: {
    //selectSelectedRoom: (roomId) => this.selected = roomId, // todo
  }
})
export default class RoomDropdown extends Vue {}
</script>

<style scoped></style>
