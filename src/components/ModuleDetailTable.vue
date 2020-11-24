<template>
  <div>
    <h1>Detail view of {{ moduleId }}</h1>
    <div class="table-responsive py-4">
    <!--  <table class="table table-striped table-hover" id="module-detail-table">
        <thead class="thead-light table-success">
          <tr>
            <th scope="col">B</th>
            <th scope="col">C</th>
            <th scope="col">D</th>
          </tr>
        </thead>
        <tbody>
          <tr
            @click="$emit('aaa-event', module.code)"
            v-for="(module, i) in myModules"
            :key="i"
          >
            <td>{{ moduleObj.code }}</td>
            <td>{{ moduleObj.description }}</td>
            <td>{{ moduleObj.status }}</td>
          </tr>
        </tbody>
      </table>-->
    </div>
  </div>
</template>

<script>
import resultsApiService from "@/service/resultsApiService";

export default {
  // not strict mode
  name: "ModuleDetailTable",
  props: {
    moduleId: String
    //moduleObj: Object
  },
  created() {
    this.getAssignments();
    console.log("the moduledetailview is now created");
    console.log("moduleId property is: " + this.moduleId);
  },
  methods: {
    async getAssignments() {
      const res = await resultsApiService.getAssignments(this.moduleId);
      console.log(res);
    }
  }
};
</script>

<style scoped></style>
