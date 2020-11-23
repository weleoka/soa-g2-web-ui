<template>
  <div id="module_details">
    <ModuleDetailTable :moduleId="moduleIdProp" />
    <button type="button" @click="returnToOverview">Return</button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ModuleDetailTable from "@/components/ModuleDetailTable.vue";
import { mapActions } from "vuex";

@Options({
  components: {
    ModuleDetailTable
  },

  data() {
    return {
      moduleIdProp: "placeholderID",
      moduleObj: {}
    };
  },
  beforeRouteUpdate(to, from, next) {
    // react to route changes. Important when switching /module/moduleCode1 to /module/moduleCode2 for example:
    // this is because the lifecycle hook is not triggered if just switching the param part of URL.
    // don't forget to call next() though!
    //console.log("BeforeRouteUpdate called with param: " + this.$router.params); // set this to local prop so child can access?
    this.moduleIdProp = this.$route.params; // todo: problem here when the data does not update.
    // todo: fetch all the details for module and save as moduleObj for clean passing to ModuleDetailTable
    next();
  },
  methods: {
    ...mapActions([]),
    returnToOverview() {
      // the home view state should be consistent still with what is in the store.
      this.$router.push("/");
    }
  },
  computed: {
    currentModuleId() {
      //<h1>Editing details for {{ currentModuleId }}</h1>
      //return this.$router.params;
    }
  },
})
export default class ModuleDetails extends Vue {}
</script>

<style></style>
