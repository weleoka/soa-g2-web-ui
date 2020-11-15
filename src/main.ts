import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import axios from "axios";

// Trying to set a global axios var.
//App.prototype.$axios =axios;


//import "popper.js/dist/umd/popper.min.js"
process.env.VUE_APP_VERSION = require("../package.json").version;


createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
