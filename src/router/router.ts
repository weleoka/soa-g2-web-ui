/*
EA & SOA Group 2 HT2020

This deals with routes to pages and resources
for the whole app. It's where we can specify
path parameters, as well as page metadata.
 */
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";
import ModuleDetails from "@/views/u3/ModuleDetails.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Main",
    component: Home,
    meta: {
      title: "Main - SOA Grupp 2",
      metaTags: [
        {
          name: "description",
          content: "The home page of soa grupp 2 app."
        },
        {
          property: "og:description",
          content: "The home page of soa grupp 2 app."
        }
      ]
    }
  },
  {
    path: "/moduleview/:moduleId", // dynamic route matching with param after colon.
    name: "moduleview", // named route
    meta: {
      title: "Module Details - SOA Grupp 2"
    },
    component: ModuleDetails
  },
  {
    path: "/gradeworks",
    name: "Betygshanteraren",
    meta: {
      title: "Betygshanteraren - Grupp 2"
    },
    component: () =>
      import(/* webpackChunkName: "testing" */ "../views/u3/Gradeworks.vue")
  },
  {
    path: "/scheduleworks",
    name: "Schemahanteraren",
    meta: {
      title: "Schemahanteraren - Grupp 2"
    },
    component: () =>
      import(/* webpackChunkName: "testing" */ "../views/u4/Scheduleworks.vue")
  },
  {
    path: "/signin",
    name: "Signin",
    meta: {
      title: "Signin - SOA Grupp 2"
    },
    component: () =>
      import(/* webpackChunkName: "signin" */ "../views/Signin.vue")
  }
  /*{ // testing this...
    // Think this is removable but may have something to do with redirect.
    path: "/signout",
    name: "Signout",
    component: () =>
      import(/!* webpackChunkName: "signout" *!/ "../views/Signin.vue")
  }*/
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
