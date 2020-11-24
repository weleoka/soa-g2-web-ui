<template>
  <div>
    <h1>Detail view of {{ moduleIdProp }}</h1>
    <div>Object recieved {{ moduleObjProp }}</div>
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
export default {
  //strict mode;
  name: "ModuleDetailTable",
  props: {
    moduleIdProp: String, // vue transforms this to module-id-prop in parent template.
    moduleObjProp: Object // vue transforms this to module-obj-prop in parent template.
  },
  created() {
    console.log("ModuleDetailTable starting for module: " + this.moduleIdProp);
  }
};
</script>

<style scoped></style>
