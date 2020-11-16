<template>
  <header class="header-global">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <!-- Container wrapper -->
      <div class="container-fluid">
        <!-- Navbar brand -->
        <a class="navbar-brand" href="#"
          ><router-link to="/">LOGO</router-link></a
        >
        <!--<ul class="navbar-nav navbar-nav-hover align-items-lg-center">
          <li class="nav-item mr-2">
            <router-link to="/">Home</router-link>
          </li>
          <li class="nav-item mr-2">
            <router-link to="/about">RANDOMIZER</router-link>
          </li>
          <li class="nav-item mr-2">
            <router-link to="/testing">Testing</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/signin">Signin</router-link>
          </li>
        </ul>-->
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
          <!-- Left links -->
          <ul class="navbar-nav mr-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#"
                ><router-link to="/">Home</router-link></a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#"
                ><router-link to="/about">RANDOMIZER</router-link></a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#"
                ><router-link to="/testing">Testing</router-link></a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                <router-link to="/signin">Signin</router-link></a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <router-view />
</template>
<script>
import axios from "axios";

export default {
  name: "App",
  props: {
    myAxios: a => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const b = a;

      axios.create({
        baseURL: "https://some-domain.com/api/",
        timeout: 1000,
        headers: { "X-Custom-Header": "foobar" }
      });
    }
  }
};
</script>

<style></style>
