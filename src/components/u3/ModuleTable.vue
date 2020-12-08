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
            v-for="(module, i) in myModules"
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
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
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
  methods: {
    ...mapMutations(["setActiveCourseCode"]), // rootStore
    ...mapActions("gradeStoreModule", ["populateModulesArr"]),
    ...mapGetters("gradeStoreModule", ["getModulesArr"]),

    getModulesBySearchStr(searchStr) {
      console.log("getModulesBySearchStr() NOT implemented, str: " + searchStr);
    },

    async selectedCourseCodeChange(courseCode) {
      if (courseCode === "ALL") {
        this.state.allModulesMode = true;
        this.setActiveCourseCode(courseCode); // from mapMutations rootStore
        await this.populateModulesArr(""); // from mapActions gradeStoreModule
      } else {
        await this.populateModulesArr(courseCode); // from mapActions gradeStoreModule
        this.state.allModulesMode = false;
      }
    }
  },
  computed: {
    myModules() {
      return this.getModulesArr(); // from mapGetters
    }
  }
  /*beforeMount() {
  }*/
};
</script>

<style scoped></style>
