<template>
  <div>
    <CourseCodeDropdown @selection-event="getModulesByCourseCode" />
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
import { mapActions } from "vuex";
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
    ...mapActions(["getModules", "setActiveCourseCode"]),

    getModulesBySearchStr(searchStr) {
      this.state.allModulesMode = false;
      console.log("getModulesBySearchStr() NOT implemented, str: " + searchStr);
    },
    async getModulesByCourseCode(courseCode) {
      if (courseCode === "ALL") {
        await this.getAllModules();
        this.state.allModulesMode = true;
      } else {
        await this.setActiveCourseCode(courseCode); // from mapActions
        this.state.allModulesMode = false;
      }
    },
    async getAllModules() {
      await this.getModules(); // from mapActions
      this.state.allModulesMode = true;
    }
  },
  computed: {
    myModules() {
      return this.$store.state.myModules;
    }
  }
  /*beforeMount() {
  }*/
};
</script>

<style scoped></style>
