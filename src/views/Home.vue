<template>
  <div class="container" id="app">
    <div>
      <div>
        <p>Hello, this is us and we are Group 2!</p>
        <p>
          We have decided to provide all our dear users with a random number
          generator, and a fully automatic addifier of those numbers - for a
          rainy day when you're bored.
        </p>
        <p>Nous vous en prie!</p>
        <div id="about">
          <h1>RandonumberAutoAddifier</h1>
        </div>
        <div>
          <Random />
        </div>
      </div>
      <div>placeholder to demonstrate flexbox</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Random from "@/components/samples/Random.vue";

@Options({
  components: {
    Random
  }
})
export default class Home extends Vue {}
</script>

<style></style>
