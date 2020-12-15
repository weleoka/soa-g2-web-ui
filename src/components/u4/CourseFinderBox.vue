<template>
  <div class="container course-finder-box">
    <div class="container-v" id="course-search-input">
      <div class="container-compact">
        <p>Sökning: &nbsp;</p>
        <p style="white-space: pre-line">{{ searchStr }}</p>
      </div>
      <div class="container-compact">
        <label> Sök:
          <input
              type="text"
              v-model="searchStr"
              placeholder="sök kurs"
              @submit="$emit('search-course-code-event', this.searchStr)"
          />
        </label>
      </div>
      <div class="container-compact">
        <button type="button" @click="$emit('search-course-code-event', this.searchStr)">
          <!-- pressing enter will also search. todo: implement elastic search! -->
          Sök
        </button>
        <button type="button" @click="$emit('refresh-courses-event')">
          Hämta alla
        </button>
      </div>
    </div>
    <div id="course-code-results-table">
      <div class="table-responsive py-4">
        <h4>Välj en kurs av {{courseCodeList.length}} alternativ</h4>
<!--        <thead class="thead-light">
          <tr>
            <th scope="col">Välj kurs ({{courseCodeList.length}}st)</th>
          </tr>
        </thead>-->
        <table class="table table-bordered table-hover">
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
  padding-right: 2em;
  border-right: none;
  height: content-box;
  overflow: hidden scroll;
  flex-grow: 3;
}

#course-search-input {
  flex-grow: 1;
  height: 200px;
}

.course-finder-box {
  height: 250px;
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
