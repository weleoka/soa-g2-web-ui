<template>
  <div class="table-responsive py-4" id="occasion-table">
    <table class="table table-borderless table-striped table-hover">
      <thead class="thead-light">
        <tr>
          <th scope="col">Tillfällekod</th>
          <th scope="col">Plats</th>
          <th scope="col">Course</th>
          <th scope="col">Period</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="occasionArr.length < 1">
          <td>inga tillfällen</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
        </tr>
        <tr
          @click="this.rowClickedHandler(i, occasion.id)"
          v-for="(occasion, i) in occasionArr"
          :key="i"
          :class="{'clicked-row' : clickedRow === i }"
        >
          <td>{{ occasion.id }}</td>
          <td>{{ occasion.locationCode }}</td>
          <td>{{ occasion.courseCode }}</td>
          <td>{{ occasion.periodCode }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  name: "OccasionTable",
  props: {
    occasionArr: Array
  },
  data() {
    return {
      clickedRow: null
    };
  },
  watch: {
    occasionArr() { this.clickedRow = null }
  },
  methods: {
    rowClickedHandler(rowId, occasionId) {
      this.clickedRow = rowId;
      this.$emit('selected-occasion-event', occasionId)
    }
  }
};
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
