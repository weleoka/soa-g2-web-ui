// Trying to make a global isntance of axios, however never managed to access it using the this.$myAxios in the components.

import axios from "axios";
import { App } from "vue";

export default {
    install: (app: App) => {
        app.config.globalProperties.$myAxios = axios.create({
          baseURL: "https://some-domain.com/api/",
          timeout: 1000,
          headers: { "X-Custom-Header": "foobar" }
        });
      }
    }
}
