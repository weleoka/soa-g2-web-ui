import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";
import ModuleDetails from "@/views/ModuleDetails.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Main",
    component: Home,
    meta: {
      title: 'Main - SOA Grupp 2',
      metaTags: [
        {
          name: 'description',
          content: 'The home page of soa grupp 2 app.'
        },
        {
          property: 'og:description',
          content: 'The home page of soa grupp 2 app.'
        }
      ]
    }
  },
  { // dynamic route matching with param after colon.
    path: "/moduleview/:moduleId",
    name: "moduleview", // named route
    meta: {
      title: "Module Details - SOA Grupp 2"
    },
    component: ModuleDetails
  },
  //   component: () =>
  //       import(/* webpackChunkName: "about" */ "../views/ModuleDetails.vue")
  // },

  {
    path: "/about",
    name: "About",
    meta: {
      title: "About - SOA Grupp 2"
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
        import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  /*  {
      path: "/testing",
      name: "Testing",
      component: () =>
          import(/!* webpackChunkName: "testing" *!/ "../views/Testing.vue")
    },*/
  {
    path: "/signin",
    name: "Signin",
    meta: {
      title: "Signin - SOA Grupp 2"
    },
    component: () =>
        import(/* webpackChunkName: "signin" */ "../views/Signin.vue")
  },
  { // Think this is removable but may have something to do with redirect.
    path: "/signout",
    name: "Signout",
    component: () =>
        import(/* webpackChunkName: "signout" */ "../views/Signin.vue")
  },
];


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
