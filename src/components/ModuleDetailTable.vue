<template>
  <div>
    <h1>Detail view of {{ moduleIdProp }}</h1>
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
  //strict mode;
  name: "ModuleDetailTable",
  props: {
    moduleIdProp: String // vue transforms this to module-id-prop in parent template.
    //moduleObj: Object
  },
  created() {
    console.log("ModuleDetailTable starting for module: " + this.moduleIdProp);
    this.getAssignments();
  },
  methods: {
    async getAssignments() {
      const res = await resultsApiService.getAssignments(this.moduleIdProp);
      console.log(res);
    }
  }
};
</script>

<style scoped></style>
