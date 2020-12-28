<template>
  <div>
    <div class="table-responsive py-4">
      <table class="table table-striped table-hover" id="module-detail-table">
        <thead class="thead-light table-success">
          <tr>
            <th scope="col">Submission ID</th>
            <th scope="col">Student ID</th>
            <th scope="col">Namn</th>
            <th scope="col">Examination</th>
            <th scope="col">Skapad</th>
            <th scope="col">Betyg</th>
            <th scope="col">Lärare ID</th>
            <th scope="col">Verifierat betyg</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(submission, i) in submissionArrProp" :key="i">
            <td>{{ submission.id }}</td>
            <td>{{ submission.studentId }}</td>
            <td>{{ submission.firstName }} {{ submission.lastName }}</td>
            <td>{{ submission.examination }}</td>
            <td>{{ submission.createdAt }}</td>
            <td>{{ submission.grade }}</td>
            <td>{{ submission.teacherId }}</td>
            <td>
              <p v-if="submission.verified">verifierat</p>
              <button
                v-else-if="!busybusy"
                @click="verifyGrade(submission.id, i)"
              >
                Verifiera
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";

@Options({
  //strict mode;
  name: "ModuleDetailTable",
  props: {
    moduleIdProp: String, // vue transforms this to module-id-prop in parent template.
    submissionArrProp: Object // vue transforms this to submissions-arr in parent template.
  },
  data() {
    return {
      busybusy: false
    };
  },
  created() {
    console.log("Loaded ModuleDetailTable for: " + this.moduleIdProp);
  },
  methods: {
    verifyGrade(submissionId, i) {
      const eventData = {
        submissionId: submissionId,
        indexNo: i
      };
      console.log("SubmissionID: " + submissionId);
      console.log("At index of: " + i);
      this.busybusy = true; // Todo: make this dynamically show and hide buttons...
      this.emitter.emit("verify-grade-event", eventData); // supply i for the ugly hack.
      this.busybusy = false;
    }
  }
})
export default class ModuleDetailTable extends Vue {}
</script>

<style scoped></style>
