import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"

//import "popper.js/dist/umd/popper.min.js"


createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
