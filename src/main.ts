import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

//import "popper.js/dist/umd/popper.min.js"
//require("./assets/css/style.css")

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"

// trying to read version for use in the app client side.
// process.env.VUE_APP_VERSION = require("../package.json").version;

"strict mode";

const app = createApp(App)
    app.use(store)
    .use(router)
    .mount("#app");

