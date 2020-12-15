<template>
  <div>
    <CourseCodeDropdown @selection-event="selectedCourseCodeChange" />
    <div class="table-responsive py-4">
      <table class="table table-striped table-hover" id="module-table">
        <thead class="thead-light table-success">
          <tr>
            <th>Course Code</th>
            <th scope="col">Module Id</th>
            <th scope="col">Description</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            @click="$emit('select-module-event', module.id)"
            v-for="(module, i) in moduleArr"
            :key="i"
          >
            <td>{{ module.courseCode }}</td>
            <td>{{ module.id }}</td>
            <td>{{ module.description }}</td>
            <td>{{ module.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <ModuleSearchInput @module-search-event="getModulesBySearchStr" />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import CourseCodeDropdown from "@/components/u3/CourseCodeDropdown";
import ModuleSearchInput from "@/components/u3/ModuleSearchInput";

export default {
  name: "ModuleTable",
  components: {
    CourseCodeDropdown,
    ModuleSearchInput
  },
  data() {
    return {
      checkedNames: []
    };
  },
  // todo: when to mapState and when to mapGetters vuex?
  computed: mapState({ moduleArr: state => state.gradeStore.moduleArr }), // works. implicitly to state.gradeStore.state.moduleArr
  methods: {
    // todo: so far failed to implement mapActions in the explicit way like below.
    //...mapActions({ populateModuleArr: state => state.gradeStore.populateModuleArr }), // this fails
    // todo: this is the array string way which I don't like because code completion falls apart.
    ...mapActions("gradeStore", ["populateModuleArr"]), // but this works
    ...mapMutations({
      setActiveCourseCode: state => state.setActiveCourseCode // root store
    }),

    // Takes a search string to find modules by. NOT implemented
    getModulesBySearchStr(searchStr) {
      console.log("getModulesBySearchStr() NOT implemented, str: " + searchStr);
    },

    // Event handler for when selected Course Code changes
    async selectedCourseCodeChange(courseCode) {
      this.setActiveCourseCode(courseCode); // from mapMutations
      if (courseCode === "ALL") {
        await this.populateModuleArr();
      } else {
        await this.populateModuleArr(courseCode);
      }
    }
  }
  /*beforeMount() {
  }*/
};
</script>

<style scoped></style>
