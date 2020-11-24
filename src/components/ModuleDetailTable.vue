<template>
  <div>
    <div class="table-responsive py-4">
      <table class="table table-striped table-hover" id="module-detail-table">
        <thead class="thead-light table-success">
          <tr>
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
          <tr
            @click="$emit('aaa-event', submission.id)"
            v-for="(submission, i) in submissionsArr"
            :key="i"
          >
            <td>{{ submission.studentId }}</td>
            <td>{{ submission.firstName }} {{ submission.lastName }}</td>
            <td>{{ submission.examination }}</td>
            <td>{{ submission.createdAt }}</td>
            <td>{{ submission.grade }}</td>
            <td>{{ submission.teacherId }}</td>
            <td>{{ submission.verified }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div>Object debug submissionsArr: {{ submissionsArr }}</div>
</template>

<script>
export default {
  //strict mode;
  name: "ModuleDetailTable",
  props: {
    moduleIdProp: String, // vue transforms this to module-id-prop in parent template.
    submissionsArr: Object // vue transforms this to module-obj-prop in parent template.
  },
  created() {
    console.log("ModuleDetailTable starting for module: " + this.moduleIdProp);
    console.log("Raw data: " + this.submissionsArr);
  }
};
</script>

<style scoped></style>
