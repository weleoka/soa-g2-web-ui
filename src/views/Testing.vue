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
  </label>
</template>

<script>
//import myAxios from "../service/myAxios";

import axios from "axios";
const myAxios = axios.create({
  baseURL: `http://localhost:8080/api/`,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});
console.log(myAxios.defaults);

// Add a request interceptor.
// Read at https://auralinna.blog/post/2019/global-http-request-and-response-handling-with-the-axios-interceptor/
axios.interceptors.request.use(
  function(config) {
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

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

    async function getModules() {
      console.log("getModules async function hello!");
      try {
        const modules = await myAxios.get("/modules", {
          debug: true,
          params: {
            code: "module02"
          }
        });
        console.log("MODULES FOUND: " + modules);
      } catch (error) {
        console.error(error);
      }
    }

    getModules();
  },
  methods: {
    async addModule() {
      const res = await myAxios.post("/modules", {
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
