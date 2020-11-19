<template>
  <div class="table-responsive py-4">
    <table class="table table-flush" id="datatable">
      <thead class="thead-light">
        <tr>
          <th>Code</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(module, i) in myModules" :key="i">
          <td>{{ module.code }}</td>
          <td>{{ module.description }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <label>
    <input type="text" v-model="searchStr" @keyup.enter="addModule" />
    <button type="button" @click="getModules">Make Request!</button>
  </label>
</template>

<script>
export default {
  name: "Testing",
  data() {
    return {
      mods: {},
      searchStr: ""
    };
  },
  methods: {
    getModules() {
      this.$store.dispatch("getModules");
    },
    addModule() {
      this.$store.dispatch("getModules");
    }
  },
  computed: {
    myModules() {
      return this.$store.state.myModules;
    }
  },
  beforeMount() {
    this.mods = this.myModules;
  }
};
</script>

<style scoped></style>
