<template>
  <div class="table-responsive py-4">
    <table class="table table-flush" id="datatable">
      <thead class="thead-light">
        <tr>
          <th>Code</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(module, i) in modules" :key="i">
          <td>{{ module.code }}</td>
          <td>{{ module.description }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <label>
    <input type="text" v-model="moduleCode" @keyup.enter="addModule" />
    <button type="button" @click="getModules">Make Request!</button>
  </label>
</template>

<script>
export default {
  name: "Testing",
  data() {
    return {
      modules: [],
      moduleCode: ""
    };
  },
  created() {
    console.log("NODE_ENV: " + process.env.NODE_ENV);
    console.log("VUE_APP_VERSION: " + process.env.VUE_APP_VERSION);
    console.log("VUE_APP_API_URL: " + process.env.VUE_APP_API_URL);
    console.log("VUE_BASE_URL: " + process.env.BASE_URL);
    console.log("PORT: " + process.env.SERVER_PORT);
    console.log("DOMAIN: " + process.env.SERVER_DOMAIN);
  },
  methods: {
    getPosts() {
      this.$store.dispatch("getPost", { id: 1 });
    },
    getModules() {
      this.$store.dispatch("getModules");
    },
    addModule() {
      console.log("Triggered addModule");
      this.$store.dispatch("getModules");
    }
  }
};
</script>

<style scoped></style>
