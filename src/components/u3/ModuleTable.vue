<template>
  <div>
    <CourseCodeDropdown @selection-event="selectedCourseCodeChange" />
    <div class="table-responsive py-4">
      <table class="table table-striped table-hover" id="module-table">
        <thead class="thead-light table-success">
          <tr>
            <th>Course Code</th>
            <!--            <th scope="col" v-show="state.allModulesMode">Course Code</th>-->
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
            <!--            <td v-show="state.allModulesMode">{{ module.courseCode }}</td>-->
            <td>{{ module.courseCode }}</td>
            <td>{{ module.id }}</td>
            <td>{{ module.description }}</td>
            <td>{{ module.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <ModuleSearchInput @module-search-event="getModulesBySearchStr" />
    <button type="button" @click="getAllModules">All modules</button>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
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
      checkedNames: [],
      state: {
        allModulesMode: false // Show or hide the courseCode column in table
      }
    };
  },
  computed: mapState({
    moduleArr: state => state.gradeStoreModule.modules // longhand due to vuex module
  }),
  methods: {
    // todo: so far failed to implement mapActions in the explicit way like below.
    //...mapActions({populateModulesArr: state => state.gradeStoreModule.populateModulesArr}),
    // todo: this is the array string way which I don't like because code completion falls apart.
    ...mapActions("gradeStoreModule", ["populateModuleArr"]),
    ...mapMutations({
      setActiveCourseCode: state => state.setActiveCourseCode // rootStore
    }),

    getModulesBySearchStr(searchStr) {
      console.log("getModulesBySearchStr() NOT implemented, str: " + searchStr);
    },

    async selectedCourseCodeChange(courseCode) {
      if (courseCode === "ALL") {
        this.state.allModulesMode = true;
        this.setActiveCourseCode(courseCode); // from mapMutations rootStore
        await this.populateModuleArr("");
      } else {
        await this.populateModuleArr(courseCode);
        this.state.allModulesMode = false;
      }
    }
  }
  /*beforeMount() {
  }*/
};
</script>

<style scoped></style>
