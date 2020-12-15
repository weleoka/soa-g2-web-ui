<template>
  <div>
    <h3>Kurssökning</h3>
    <div class="container course-finder-box">
      <div class="container-v" id="course-search-input">
        <div class="container-compact">
          <p>Sök efter kurs, och välj i tabellen till höger.</p>
<!--          <p style="white-space: pre-line">{{ searchStr }}</p>-->
        </div>
        <div class="container-compact">
          <label>Sök kurs:
            <input
                type="text"
                v-model="searchStr"
                placeholder="kurskod"
                @keyup.enter="$emit('search-course-code-event', this.searchStr)"
            />
          </label>
        </div>
        <div class="container-compact">
          <button type="button" class="btn" @click="$emit('search-course-code-event', this.searchStr)">
            <!-- pressing enter will also search. todo: implement elastic search! -->
            Sök
          </button>
          <button type="button" class="btn" @click="$emit('refresh-courses-event')">
            Hämta alla
          </button>
          <button type="button" class="btn" @click="clearSearch">
            Rensa
          </button>
        </div>
      </div>
      <div class="table-responsive py-4" id="course-code-results-table">
        <table class="table table-bordered table-hover">
          <thead class="thead-light">
          <tr>
            <th scope="col">Välj kurs ({{courseCodeList.length}}st)</th>
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
            <td>{{ courseCode }} - och här lite mer metadata om kursen</td>
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
  },
  methods: {
    clearSearch() {
      this.searchStr = "";
      this.$emit('search-course-code-event', this.searchStr);
    }
  }
}
</script>

<style scoped>
#course-code-results-table {
  overflow: auto;
  overflow-y: scroll;
  flex-grow: inherit;
  height: content-box;
  width: 550px;
  padding-right: 2em;
  border-right: none;
}

#course-search-input {
  flex-grow: 1;
}

.course-finder-box {
  height: 250px;
}

.btn {
  margin: 10px;
  max-height: 40px;
  padding: 6px 10px;
  background: #ffffff;
  cursor: pointer;
  margin-bottom: 1rem;
  border: 2px solid #cccccc;
  outline: none;
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
