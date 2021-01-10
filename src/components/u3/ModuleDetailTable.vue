<template>
  <div>
    <div class="table-responsive py-4">
      <div>
        <table
          v-if="submissionArr && submissionArr.length"
          class="table table-striped table-hover"
          id="module-detail-table"
        >
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
          <tbody v-if="submissionArr && submissionArr.length">
            <tr v-for="(submission, i) in submissionArr" :key="i">
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
                  v-else-if="!state.loading"
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
  </div>
</template>

<script lang="ts">
import { Options, PropOptions, Vue } from "vue-class-component";
import { Submission } from "@/entities/submission";

@Options({
  name: "ModuleDetailTable",
  props: {
    submissionArr: {
      type: Array,
      default() {
        return [];
      }
    } as PropOptions<Submission[]>
  },
  emits: ["verify-grade-event"],
  data() {
    return {
      state: {
        loading: false
      }
    };
  },
  methods: {
    verifyGrade(submissionId, i) {
      console.log("SubmissionID: " + submissionId);
      console.log("At index of: " + i);
      this.state.loading = true; // Todo: make this dynamically show and hide buttons...
      this.emit("verify-grade-event", submissionId, i); // supply i for the ugly hack.
      this.state.loading = false;
    }
  }
})
export default class ModuleDetailTable extends Vue {}
</script>

<style scoped></style>
