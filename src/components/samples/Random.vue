<template>
  <div>
    <h1>Current random value: {{ randomValue }}</h1>
    <div>Number of times: {{ times.length }}</div>
    <div>Total: {{ total }}</div>
    <button @click="generate()">Generate a random value</button>
    <button @click="init()">Init</button>
    <ul>
      <li v-for="(item, index) in times" :key="index">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, computed, toRef } from "vue";

export default {
  name: "Random",
  setup(props, context) {
    // Attributes (Non-reactive object)
    console.log(context.attrs);
    // Slots (Non-reactive object)
    console.log(context.slots);
    // Emit Events (Method)
    console.log(context.emit);
    const title = toRef(props, "title");
    //const { title2 } = toRefs(props);
    console.log(title.value);
    //console.log(title2.value);

    const randomValue = ref(0);
    const times = ref([]);
    function generate() {
      randomValue.value = Math.floor(Math.random() * Math.floor(9)) + 1;
      times.value.unshift(randomValue.value);
    }
    function init() {
      randomValue.value = 0;
      times.value = [];
    }
    const total = computed(() => {
      let t = 0;
      for (let i = 0; i < times.value.length; i++) {
        t += times.value[i];
      }
      return t;
    });
    return { randomValue, times, total, generate, init };
  }
};
</script>

<style scoped></style>
