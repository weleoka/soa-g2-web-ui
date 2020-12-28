<template>
  <div>
    <label>
      <input
        type="text"
        v-model="searchStr"
        @keyup.enter="$emit('module-search-event', this.searchStr)"
      />
    </label>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";

@Options({
  name: "ModuleSearchInput",
  data() {
    return {
      searchStr: ""
    };
  }
})
export default class ModuleSearchInput extends Vue {}
</script>

<style scoped></style>
