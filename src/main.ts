import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

//import "popper.js/dist/umd/popper.min.js"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"


// === All this is trying to get a global instance of Axios. ===

//import myAxios from "./plugins/axiosGlobal"
/*
import axios from "axios";
const myAxios = axios.create({
  baseURL: "https://some-domain.com/api/",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" }
});

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: myAxios;
  }
}
*/

//const api = axios.create()
// We create our own axios instance and set a custom base URL.
// Note that if we wouldn't set any config here we do not need
// a named export, as we could just `import axios from 'axios'`
//const axiosInstance = axios.create()
//console.log(axiosInstance.defaults);
//
// declare module '@vue/runtime-core' {
// interface ComponentCustomProperties {
//      $axios: api
//    }
// }
// app.config.globalProperties.$router = router

/* Injecting as a global property
import axios from "axios";
const myAxios = axios.create({
    baseURL: "https://some-domain.com/api/",
    timeout: 1000,
    headers: { "X-Custom-Header": "foobar" }
});
*/

// === End global instance of axios (still can't) ===

// trying to read version for use in the app client side.
// process.env.VUE_APP_VERSION = require("../package.json").version;

const app = createApp(App)
    app.use(store)
    .use(router)
    //.use(myAxios)
    .mount("#app");

