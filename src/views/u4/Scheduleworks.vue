<template>
  <div id="home">
    <ModuleTable @select-module-event="getModuleDetails" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ModuleTable from "@/components/u3/ModuleTable.vue";

import { mapActions } from "vuex";

@Options({
  components: {
    ModuleTable
  },
  methods: {
    ...mapActions([]), // remove
    getModuleDetails(moduleId: string) {
      console.log("select-module-event triggered data: " + moduleId);
      this.$router.push({ name: "moduleview", params: { moduleId } });
      // The above translates to being the same as:
      //this.$router.push({ name: "moduleview", params: { moduleId: moduleId } });
    }
  }
})
export default class Home extends Vue {}
</script>

<style></style>
