<template>
  <div id="module_details">
    <h1>Detaljvy för inlämningar i "{{ moduleId }}"</h1>
    <ModuleDetailTable
      v-if="!loading"
      :module-id-prop="moduleId"
      :submission-arr="submissionArr"
    />
    <div v-if="loading">Loading...</div>
    <button type="button" @click="returnToOverview">Return</button>
  </div>
</template>

<script lang="ts">
import ModuleDetailTable from "@/components/u3/ModuleDetailTable.vue";
import resultService from "@/service/u3/resultService";
import { Options, Vue } from "vue-class-component";

@Options({
  components: {
    ModuleDetailTable
  },

  data() {
    return {
      loading: false, // the detail table content loading
      moduleId: "placeholderID",
      submissionArr: {}
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
  mounted() {
    this.emitter.on("verify-grade-event", (eventData: any) => { //eslint-disable-line
      console.log("Verifying submission: " + eventData.submissionId);
      console.log("Faking the verification for index: " + eventData.indexNo);
      this.verifyGradeHandler(eventData.submissionId, eventData.indexNo);
    });
  },
  methods: {
    returnToOverview() {
      this.$router.push("/");
    },
    async updateModuleObj() {
      this.loading = true;
      this.submissionArr = await resultService.getSubmissionsByAssignment(
        this.moduleId
      );
      this.loading = false;
    },
    async verifyGradeHandler(submissionId: string, i: number) {
      const res = await resultService.submitGradeVerification(submissionId);
      this.submissionArr[i].verified = true; // the ugly hack.
      //Todo here set the verification status locally as a fix... however that means we will have to
      //  mae the submissionArr/submissionsArr persistent in this.$store, which brings on the question
      //  of how when we read from local store and when we read from API. A kind of how-fresh-is-it scenario.
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
