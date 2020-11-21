<template>
  <CourseCodeDropdown @selection-event="getModulesByCourseCode"/>
  <div class="table-responsive py-4">
    <table class="table table-flush" id="datatable">
      <thead class="thead-light">
        <tr>
          <th v-show="state.allModulesMode">Course Code</th>
          <th>Module Id</th>
          <th>Description</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(module, i) in myModules" :key="i">
          <td v-show="state.allModulesMode">{{ module.course_code }}</td>
          <td>{{ module.code }}</td>
          <td>{{ module.description }}</td>
          <td>{{ module.status }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <label>
    <input type="text" v-model="searchStr" @keyup.enter="addModule" />
    <button type="button" @click="getAllModules">Get All modules</button>
  </label>
</template>

<script>
import CourseCodeDropdown from "@/components/CourseCodeDropdown";
import { mapActions } from "vuex";

export default {
  name: "Testing",
  components: {
    CourseCodeDropdown
  },
  data() {
    return {
      mods: {},
      searchStr: "",
      state: {
        allModulesMode: false
      }
    };
  },
  methods: {
    ...mapActions(["getModules", "setActiveCourseCode"]),

    getModulesByCourseCode(courseCode) {
      this.state.allModulesMode = false;
      this.setActiveCourseCode(courseCode); // from mapActions
    },
    getAllModules() {
      this.state.allModulesMode = true;
      this.getModules(); // from mapActions
    },
    addModule() {
      this.getModules(); // from mapActions
    }
  },
  computed: {
    myModules() {
      return this.$store.state.myModules;
    }
  },
  beforeMount() {
    // this.myModules is a computed property, but could instead be a mapGetters["myModules"] call..
    this.mods = this.myModules;
  }
};
</script>

<style scoped></style>
