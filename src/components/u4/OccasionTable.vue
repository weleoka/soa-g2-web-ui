<template>
  <div class="table-responsive py-4" id="occasion-table">
    <table class="table table-borderless table-striped table-hover">
      <thead class="thead-light">
        <tr>
          <th scope="col">Kod</th>
          <th scope="col">Plats</th>
          <th scope="col">Kurs</th>
          <th scope="col">År</th>
          <th scope="col">Period</th>
          <!--          <th scope="col">Rate</th>-->
        </tr>
      </thead>
      <tbody>
        <tr v-if="!occasionArr.length">
          <td>inga tillfällen</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
        </tr>
        <tr
          v-for="(occasion, i) in occasionArr"
          :key="i"
          :class="{ 'clicked-row': clickedRow === i }"
          @click="rowClickedHandler(i, occasion)"
        >
          <td>{{ occasion.id }}</td>
          <td>{{ occasion.locationCode }}</td>
          <td>{{ occasion.courseCode }}</td>
          <td>{{ occasion.year }}</td>
          <td>{{ occasion.periods }}</td>
          <!--          <td>{{ occasion.studyRate }}</td>-->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Options, PropOptions, Vue } from "vue-class-component";
import { Occasion } from "@/entities/occasion";

@Options({
  name: "OccasionTable",
  props: {
    occasionArr: {
      type: Array,
      default() {
        return [];
      }
    } as PropOptions<Occasion[]>
  },
  emits: ["selected-occasion-event"],
  data() {
    return {
      clickedRow: null
    };
  },
  watch: {
    occasionArr() {
      this.clickedRow = null;
    }
  },
  methods: {
    rowClickedHandler(rowId, occasion: Occasion) {
      this.clickedRow = rowId;
      this.$emit("selected-occasion-event", occasion);
    }
  }
})
export default class OccasionTable extends Vue {}
</script>

<style scoped>
#occasion-table {
  overflow: auto;
  overflow-y: scroll;
  height: content-box;
  width: 450px;
  padding-right: 1em;
  border-right: none;
}
</style>
