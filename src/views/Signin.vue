<template>
  <!-- Section -->
  <section class="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
    <div class="container">
      <div
        class="row justify-content-center form-bg-image"
        data-background-lg="../../assets/img/illustrations/signin.svg"
      >
        <div class="col-12 d-flex align-items-center justify-content-center">
          <div
            class="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500"
          >
            <div class="text-center text-md-center mb-4 mt-md-0">
              <h1 class="mb-0 h3">Sign in to our platform</h1>
            </div>
            <!-- Form -->
            <form @submit.prevent="signin()" class="mt-4">
              <div class="form-group mb-4">
                <label for="email">Your Email</label>
                <div class="input-group">
                  <span class="input-group-text" id="basic-addon1"
                    ><span class="fas fa-envelope"></span
                  ></span>
                  <input
                    v-model="input.email"
                    type="email"
                    class="form-control"
                    placeholder="example@company.com"
                    id="email"
                    autofocus
                    required
                  />
                </div>
              </div>
              <!-- Form group -->
              <div class="form-group">
                <div class="form-group mb-4">
                  <label for="password">Your Password</label>
                  <div class="input-group">
                    <span class="input-group-text" id="basic-addon2"
                      ><span class="fas fa-unlock-alt"></span
                    ></span>
                    <input
                      v-model="input.password"
                      type="password"
                      placeholder="Password"
                      class="form-control"
                      id="password"
                      required
                    />
                  </div>
                </div>
              </div>
              <button type="submit" class="btn btn-block btn-primary">
                Sign in
              </button>
            </form>
            <!-- End of Form -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Signin",
  data() {
    return {
      input: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async signin() {
      console.log("method async signin() in Signin.vue: " + this.input.email);
      const res = await this.$store.dispatch("doSignin", {
        email: this.input.email,
        password: this.input.password
      });
      if (res) {
        await this.$router.push("/About");
      }
    }
  }
};
</script>

<style scoped></style>
