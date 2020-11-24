<template>
  <div id="module_details">
    <ModuleDetailTable :module-id-prop="moduleId" :module-obj-prop="moduleObj"/>
    <button type="button" @click="returnToOverview">Return</button>
  </div>
</template>

<script lang="ts">
import ModuleDetailTable from "@/components/ModuleDetailTable.vue";
import resultsApiService from "@/service/resultsApiService";
import { mapActions } from "vuex";
import { Options, Vue } from "vue-class-component";

@Options({
  components: {
    ModuleDetailTable
  },

  data() {
    return {
      moduleId: "placeholderID",
      moduleObj: {}
    };
  },
  created() {
    console.log("ModuleDetails->created() and this.$route.params.moduleId: " + this.$route.params.moduleId);
    // todo: fetch all the details for module and save as moduleObj for clean passing to ModuleDetailTable
    this.moduleId = this.$route.params.moduleId;
    this.updateModuleObj();
  },
  methods: {
    //...mapActions([]),
    returnToOverview() {
      this.$router.push("/");
    },
    async updateModuleObj() {
      const res = await resultsApiService.getAssignments(this.moduleId);
      console.log(res);
      this.moduleObj = res;
    }
  },
  computed: {
    currentModuleId() {
      return this.$route.params;
    }
  }
})
export default class ModuleDetails extends Vue {}
/*BeforeRouteUpdate(to, from, next) { // problem was this whole method never gets called.
  // Its supposed to react to route changes, importantly when switching /module/moduleCode1 to /module/moduleCode2 for example:
  // this is because the lifecycle hook is not triggered if just switching the param part of URL.
  // don't forget to call next() though!
  console.log("BeforeRouteUpdate called with param: " + this.$route.params); // set this to local prop so child can access?
  this.moduleId = this.$route.params;
  next();
},*/
</script>

<style></style>
