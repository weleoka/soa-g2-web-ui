<template>
  <div>
    <CourseCodeDropdown @selection-event="selectionEventHandler" />
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

<script lang="ts">
import { mapActions, mapState } from "vuex";
import { Options, Vue } from "vue-class-component";
import CourseCodeDropdown from "@/components/u3/CourseCodeDropdown.vue";
import ModuleSearchInput from "@/components/u3/ModuleSearchInput.vue";

@Options({
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
  computed: {
    ...mapState("gradeStore", ["moduleArr"])
  },
  methods: {
    ...mapActions("gradeStore", ["doSelectCourseByCourseCode"]),

    /* Takes a search string to find modules by. NOT implemented */
    getModulesBySearchStr(searchStr) {
      console.log("getModulesBySearchStr() NOT implemented, str: " + searchStr);
    },

    /* Event handler for when selected Course Code changes */
    async selectionEventHandler(courseCode) {
      if (courseCode === "ALL") {
        this.doSelectCourseByCourseCode();
      } else {
        this.doSelectCourseByCourseCode(courseCode);
      }
    }
  }
})
export default class ModuleTable extends Vue {}
</script>

<style scoped></style>
