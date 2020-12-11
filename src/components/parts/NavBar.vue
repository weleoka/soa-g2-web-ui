<template>
  <header class="header-global">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <!-- Container wrapper -->
      <div class="container-fluid">
        <!-- Navbar brand -->
        <router-link class="navbar-brand" to="/">
          <img
            class="navbar-brand"
            src="/img/brand/logo.png"
            style="height: 90px"
            alt="logo"
          />
        </router-link>

        <!-- Toggle button -->
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="fas fa-bars"></i>
        </button>

        <!-- Collapsible wrapper -->
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto mb-2 mb-lg-0">
            <li
              class="nav-item"
              v-for="item in menuItems"
              :key="item"
              :class="['menu-item', { active: selected === item.path }]"
            >
              <router-link class="nav-link" v-bind:to="item.path">
                {{ item.text }}
              </router-link>
            </li>
          </ul>

          <!-- Singnin dynamic route -->
          <ul class="navbar-nav mr-auto mb-2 mb-lg-0">
            <li
                class="nav-item signin-special"
                :class="['menu-item', { active: selected === '/signin' }]"
            >
              <router-link class="nav-link" v-if="!isSignedIn" to="/signin">
                Signin
              </router-link>
              <a
                  href="/#"
                  class="nav-link"
                  v-else
                  @click="doSignout"
              >
                <span v-if="isSignedIn"> - Sign out {{ userEmail }} - </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "NavBar",
  data() {
    return {
      menuItems: [
        {
          text: "Home",
          path: "/"
        },
        {
          text: "Betygshanteraren",
          path: "/gradeworks"
        },
        {
          text: "Schemahanteraren",
          path: "/scheduleworks"
        }
      ]
    };
  },
  computed: {
    selected() {
      return this.$route.path;
    },
    ...mapState({
      isSignedIn: state => state.authStore.authUser.tokenId,
      userEmail: state => state.authStore.authUser.userEmail
    })
  },
  methods: mapActions({
    doSignout: state => state.authStore.doSignout()
  }),
  setup(props) {
    console.log(
      "setup() in MyHeader.vue accessing props.userEmail:" + props.userEmail
    );
  },
/*  beforeMount() {
    console.log("beforeMount() " + this.selected);
    this.selected = this.$route.path;
  }*/
};
</script>

<style scoped>
.active {
  border-bottom: 3px solid green;
}

.signin-special {
  display: flex;
  justify-content: flex-end;
}
</style>
