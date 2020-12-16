<template>
  <div class="table-responsive py-4" id="occasion-table-results-table">
    <table class="table table-boarderd table-hover">
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
          @click="$emit('selected-occasion-event', occasion.id)"
          v-for="(occasion, i) in occasionArr"
          :key="i"
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
  components: {},
  props: {
    occasionArr: Array
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
#occasion-table-results-table {
  overflow: auto;
  overflow-y: scroll;
  height: content-box;
  width: 450px;
  padding-right: 1em;
  border-right: none;
}
</style>
