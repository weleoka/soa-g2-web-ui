<template>
  <div id="module_details">
    <h1>Detaljvy för inlämningar i "{{ moduleId }}"</h1>
    <ModuleDetailTable
      v-if="!loading"
      :module-id-prop="moduleId"
      :submissions-arr="moduleObj"
      :verify-button-busy="loading2"
      @verify-grade-event="verifyGradeHandler"
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
      loading: false, // the detail table content loading
      loading2: false, // the verify button
      moduleId: "placeholderID",
      moduleObj: {}
    };
  },
  created() {
    console.log(
      "ModuleDetails->created() : this.$route.params.moduleId: " +
        this.$route.params.moduleId
    );
    this.moduleId = this.$route.params.moduleId;
    try {
      this.updateModuleObj();
      console.log("Updated module details.");
    } catch (e) {
      console.log("Couldn't get module details. Returning to overview view.");
      this.returnToOverview();
    }
  },
  methods: {
    ...mapActions([]), //does nothing for now
    returnToOverview() {
      this.$router.push("/");
    },
    async updateModuleObj() {
      this.loading = true;
      this.moduleObj = await resultsApiService.getSubmissionsByAssignment(
        this.moduleId
      );
      this.loading = false;
    },
    async verifyGradeHandler(submissionId: string, i: number) {
      console.log("Verifying grade event triggered for: " + submissionId);
      this.loading2 = true;
      const res = await resultsApiService.submitGradeVerification(submissionId);
      this.moduleObj[i].verified = true; // the ugly hack.
      //Todo here set the verification status locally as a fix... however that means we will have to
      //  make the moduleObj/submissionsArr persistent in this.$store, which brings on the question
      //  of how when we read from local store and when we read from API. A kind of how-fresh-is-it scenario.
      console.log(res);
      this.loading2 = false;
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
