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

<script>
export default {
  name: "ModuleSearchInput",
  data() {
    return {
      searchStr: ""
    };
  }
};
</script>

<style scoped></style>
