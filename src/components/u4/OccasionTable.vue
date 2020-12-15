<template>
  <div class="table-responsive py-4">
    <table class="table table-striped table-hover" id="occasion-table">
      <thead class="thead-light table-success">
        <tr>
          <th>Välj</th>
          <th scope="col">Tillfällekod</th>
          <th scope="col">Plats</th>
          <th scope="col">Course</th>
          <th scope="col">Period</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="occasionArr.length < 1">
          <td></td>
          <td>inga tillfällen</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
        </tr>
        <tr
          @click="$emit('selected-occasion-event', occasion.id)"
          v-for="(occasion, i) in occasionArr"
          :key="i"
        >
          <td>checkbox</td>
          <td>{{ occasion.id }}</td>
          <td>{{ occasion.locationCode }}</td>
          <td>{{ occasion.courseCode }}</td>
          <td>{{ occasion.periodCode }}</td>
        </tr>
      </tbody>
    </table>
    <button type="button" @click="$emit('refresh-occasions-event')">
      Alla kurstillfällen
    </button>
  </div>
</template>

<script>
"use strict";

export default {
  name: "OccasionTable",
  components: {},
  props: {
    occasionArr: null
  },
  data() {
    return {
      checkedOccasions: []
    };
  },
  computed: {
    //occasionArr: state => state.scheduleStoreModule.occasionArr // longhand explicit to vuex module
  },
  methods: {}
};
</script>

<style scoped>
#occasion-table {
  overflow: auto;
}
</style>
