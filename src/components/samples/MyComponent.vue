<template>
  <h1></h1>
</template>

<script lang="ts">
import {ref} from "vue";

export default {
  //The ref() function takes a value and returns a reactive and mutable ref object. You can access or mutate the value of the ref object using the .value property but that's only inside the setup() method. In the corresponding template, you can use the name of the variable as usual i.e productName in our case.

  name: "MyComponent",
  setup() {
    const productName = ref("Product 001");

    return { productName };
  }
};
</script>

<style scoped></style>
