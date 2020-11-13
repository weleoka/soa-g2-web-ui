import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import 'mdb-ui-kit/css/mdb.min.css';

import "bootstrap/dist/css/bootstrap.min.css"

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
