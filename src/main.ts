/*
EA & SOA Group 2 HT2020
This is sort of the app entrypoint where we declare
dependency injection, instantiate the Vue instance
and other things like that.

It finishes by binding the Vue instance to a DOM element.

 */
import { createApp } from "vue";
import App from "./App.vue";
//import "./registerServiceWorker"; // Not currently used.
import router from "./router/router";
import store from "./store/store";
import mitt, { Emitter } from "mitt"; // EventBus // EventBus
//import "popper.js/dist/umd/popper.min.js"
//require("./assets/css/style.css") // see include in App.vue style tag.
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

// trying to read version for use in the app client side.
// process.env.VUE_APP_VERSION = require("../package.json").version;

// === BEGIN META HEAD hack ===
// This callback runs before every route change, including on page load.
// It's a way of hacking the title and other elements in the head.
// Unfortunately vue-meta npm package is not yet available for Vuejs3.
// https://www.digitalocean.com/community/tutorials/vuejs-vue-router-modify-head
router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.metaTags);
  /*  const previousNearestWithMeta = from.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.metaTags);*/

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll("[data-vue-router-controlled]")).map(
    el => {
      if (el.parentNode) {
        return el.parentNode.removeChild(el);
      }
    }
  );

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags
    .map((tagDef: { [x: string]: string }) => {
      const tag = document.createElement("meta");

      Object.keys(tagDef).forEach(key => {
        tag.setAttribute(key, tagDef[key]);
      });

      // We use this to track which meta tags we create, so we don't interfere with other ones.
      tag.setAttribute("data-vue-router-controlled", "");

      return tag;
    })
    // Add the meta tags to the document head.
    .forEach((tag: any) => document.head.appendChild(tag));

  next();
});
// === END META HEAD hack ===

// Removed the event bus called mitt. May be useful again at some point
//const emitter = mitt(); // javascript way
//const emitter: Emitter = mitt(); // typescript way
const app = createApp(App);
//app.config.globalProperties.emitter = emitter;

//app.provide('emitter', emitter)
app
  .use(store)
  .use(router)
  .mount("#app");
