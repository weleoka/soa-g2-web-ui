<template>
  <div class="container">
    <div class="container-v" id="course-search-input">
      <div class="container-compact">
        <p>Sökning:</p>
        <p style="white-space: pre-line">remove me: {{ searchStr }}</p>
      </div>
      <div class="container-compact">
        <input
            type="text"
            v-model="searchStr"
            placeholder="sök kurs"
            @submit="$emit('search-course-code-event', this.searchStr)"
        />
      </div>
      <div class="container-compact">
        <button type="button" @click="$emit('search-course-code-event')">
          <!-- pressing enter will also search. todo: implement elastic search! -->
          Sök
        </button>
        <button type="button" @click="$emit('refresh-courses-event')">
          Hämta alla
        </button>
      </div>
    </div>
    <div id="course-code-results-table">
      <h2>Kurslista</h2>
      <div class="table-responsive py-4">
        <table class="table table-bordered table-hover">
          <thead class="thead-light">
          <tr>
            <th scope="col">implement scrolling-table (overflow: scroll)</th>
          </tr>
          </thead>
          <tbody>
          <tr v-if="courseCodeList.length === 0">
            <td>Sök eller hämta kurslista</td>
          </tr>
          <tr
              @click="$emit('selected-course-event', courseCode)"
              v-for="(courseCode, i) in courseCodeList"
              :key="i"
          >
            <td>{{ courseCode }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "CourseFinderBox",
  props: {
    courseDetails: Object,
    courseCodeList: Array
  },
  data() {
     return {
      searchStr: "" // full, or part, case-insensitive matching a course code
    }
  }
}
</script>

<style scoped>
#course-code-results-table {
  flex-grow: 3;
}

#course-search-input {
  flex-grow: 1;
  height: 200px;
}
</style>



/*
/*  setup(props, context) {
// Attributes (Non-reactive object)
console.log(context.attrs);
// Slots (Non-reactive object)
console.log(context.slots);
// Emit Events (Method)
console.log(context.emit);
const avarint = ref(0);
const bvarlist = ref([]);
},*/
/*  data() {
return {
details: {},
localList: []
}
},
created() {
// don't mutate a prop directly, copy it locally.
this.details = this.courseDetails;
this.localList = this.courseCodeList;
},
computed: {
//stupidProps: state => this.courseCodeList
stupidProp() {
return this.courseCodeList
}
}*/

*/
