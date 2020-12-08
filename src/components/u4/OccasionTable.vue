<template>
  <div class="table-responsive py-4">
    <table class="table table-striped table-hover" id="occasion-table">
      <thead class="thead-light table-success">
        <tr>
          <th>Välj</th>
          <th scope="col">Tillfällekod</th>
          <th scope="col">Plats</th>
          <th scope="col">Period</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>im a checkbox</td>
          <td>placeholder</td>
          <td>placeholder</td>
          <td>placeholder</td>
        </tr>
        <tr
          @click="$emit('select-occasion-event', occasion.id)"
          v-for="(occasion, i) in occasionArr"
          :key="i"
        >
          <td>{{ occasion.occasionCode }}</td>
          <td>{{ occasion.location }}</td>
          <td>{{ occasion.period }}</td>
        </tr>
      </tbody>
    </table>
    <button type="button" @click="$emit('refresh-occasions-event')">
      Refresh tillfällen
    </button>
  </div>
</template>

<script>
"use strict";

export default {
  name: "OccasionTable",
  components: {},
  data() {
    return {
      checkedOccasions: [],
      occasionArr: []
    };
  },
  methods: {}
};
</script>

<style scoped></style>
