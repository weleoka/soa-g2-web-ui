<template>
  <div id="module_details">
    <h1>Detail view of submissions in {{ moduleId }}</h1>
    <ModuleDetailTable
      v-if="!loading"
      :module-id-prop="moduleId"
      :module-obj-prop="moduleObj"
    />
    <div v-if="loading">Loading...</div>
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
      loading: false,
      moduleId: "placeholderID",
      moduleObj: {}
    };
  },
  created() {
    console.log("ModuleDetails->created() and this.$route.params.moduleId: " + this.$route.params.moduleId);
    // todo: fetch all the details for module and save as moduleObj for clean passing to ModuleDetailTable
    this.moduleId = this.$route.params.moduleId;
    try {
      this.updateModuleObj();
    } catch (e) {
      this.returnToOverview();
    }
  },
  methods: {
    ...mapActions([]), //does nothing for now
    returnToOverview() {
      this.$router.push("/");
    },
    async updateModuleObj() {
      // todo: rersultsApiService should map to a reliable frontend domain object
      // todo: any API errors(And response codes should be handled in resultsApiService
      this.loading = true;
      const res = await resultsApiService.getAssignments(this.moduleId);
      if (res) {
        if (res.status === 200) {
          this.moduleObj = res.data.submissions;
          this.loading = false;
        } else {
          throw Error("No module with this ID can be loaded!");
        }
      }
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
