<template>
  <div id="home">
    <ModuleTable @selected-module-event="getModuleDetails" />
    <ModuleDetailTable />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ModuleTable from "@/components/ModuleTable.vue";
import ModuleDetailTable from "@/components/ModuleDetailTable.vue";
import {mapActions} from "vuex"; // @ is an alias to /src

@Options({
  components: {
    ModuleTable,
    ModuleDetailTable
  },
  methods: {
    ...mapActions(["setActiveModuleCode"]), // Implement this too
    getModuleDetails(moduleCode: string) {
      // set the prop for passing to ModuleDetailTable
      console.log("getModuleDetails() NOT implemented, code: " + moduleCode);
    }
  }
})
export default class Home extends Vue {}
</script>

<style></style>
