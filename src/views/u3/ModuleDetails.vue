<template>
  <div id="module_details">
    <h1>Detaljvy för inlämningar i "{{ moduleId }}"</h1>
    <ModuleDetailTable
      v-if="!state.loading"
      :submission-arr="submissionArr"
      @verify-grade-event="verifyGradeHandler"
    />
    <div v-if="state.loading">Loading...</div>
    <button type="button" @click="returnToOverview">Return</button>
  </div>
</template>

<script lang="ts">
import ModuleDetailTable from "@/components/u3/ModuleDetailTable.vue";
import resultService from "@/service/u3/resultService";
import { Options, Vue } from "vue-class-component";
import {handle, throwApiError} from "@/service/errors";

@Options({
  components: {
    ModuleDetailTable
  },
  data() {
    return {
      state: {
        loading: false,
      },
      moduleId: "placeholderID",
      submissionArr: []
    };
  },
  created() {
    console.log(
      "ModuleDetails->created() : this.$route.params.moduleId: " +
        this.$route.params.moduleId
    );
    this.moduleId = this.$route.params.moduleId;

    this.state.loading = true;
    let res = [];
    (async () => {
      res = await resultService.getSubmissionsByAssignment(this.moduleId);
    })().catch(e => {
      console.log(e);
    });
    this.state.loading = false;
    if (res.length) {
      this.submissionArr = res;
    } else {
      console.log("No submissions found for module " + this.moduleId);
      this.returnToOverview();
    }
  },
  methods: {
    returnToOverview() {
      this.$router.push("/gradeworks");
    },

    /* Tries to update submissionsArr */
/*    async updateSubmissionArr() {
      console.debug("updateSubmissionArr() with: " + this.moduleId);
      const [arr, err] = await handle(resultService.getSubmissionsByAssignment(
        this.moduleId
      ));
      if (!err) {
        console.debug("Updated submissionArr: " + arr);
        return arr;
      } else {
        console.error("ERROR: " + err.message + "\n" + err);
        console.log("Couldn't get module details. Returning to overview view.");
        return []
      }
    },*/

    /* Hacked method faking verification */
    async verifyGradeHandler(submissionId: string, i: number) {
      console.log("Verifying submission: " + submissionId);
      console.log("Faking the verification for index: " + i);
      const res = await resultService.submitGradeVerification(submissionId);
      this.submissionArr[i].verified = true; // the ugly hack.
      console.log(res);
    }
  },
  computed: {
    currentModuleId() {
      return this.$route.params;
    }
  }
})
export default class ModuleDetails extends Vue {}
/*Note on dynamic routes:
  // Important eg. switching /module/moduleCode1 to /module/moduleCode2
  // because the lifecycle hook is not triggered if just switching the param part of URL.
  // note: don't forget to call next()
  // problem was this whole method never gets called. Maybe it's legacy logic.
  BeforeRouteUpdate(to, from, next) {
  console.debug("BeforeRouteUpdate called with param: " + this.$route.params);
  this.moduleId = this.$route.params;
  next();
},*/
</script>

<style></style>
