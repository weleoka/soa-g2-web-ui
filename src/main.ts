import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import './../node_modules/foundation-sites/dist/css/foundation.min.css';
import './../node_modules/foundation-sites/dist/js/foundation.min.js';



createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
