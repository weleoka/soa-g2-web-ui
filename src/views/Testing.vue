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

  <input type="text" v-model="moduleCode" @keyup.enter="addModule">
</template>

<script>
import axios from "axios";

const baseURL = process.env.VUE_APP_API_URL;

export default {
  name: "Testing",
  data() {
    return {
      modules: [],
      moduleCode: ""
    };
  },
  created() {
    console.log("VUE_APP_VERSION: " + process.env.VUE_APP_VERSION);
    console.log("VUE_APP_API_URL: " + process.env.VUE_APP_API_URL);
    async function getModules() {
      try {
        const modules = await axios.get(baseURL + "/modules", {
          params: {
            code: "module02"
          }
        });
        console.log(modules);
      } catch (error) {
        console.error(error);
      }
    }

    getModules();
  },
  methods: {
    async addModule() {
      const res = await axios.post(baseURL + "/modules", {
        code: this.moduleCode
      });
      console.log(res.data);
      this.modules = [...this.modules, res];

      this.todoName = "";
    }
  }
};
</script>

<style scoped></style>
