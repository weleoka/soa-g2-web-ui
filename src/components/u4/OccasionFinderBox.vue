<template>
  <div class="container occasion-finder-box">
    <div class="container-v">
      <h3>Val av kurstillfällen</h3>
      <p>Välj ett kurstillfälle av {{ occasionArr.length }} alternativ nedan</p>
      <OccasionTable
        :occasion-arr="occasionArr"
        @selected-occasion-event="selectedOccasionHandler"
      />
      <div>
        <button
          class="btn-a"
          type="button"
          @click="$emit('refresh-occasions-event')"
        >
          Alla kurstillfällen
        </button>
        <button
          type="button"
          class="btn-a"
          @click="$emit('clear-occasions-event')"
        >
          Rensa
        </button>
      </div>
    </div>
    <OccasionDetailBox
      v-if="Ut.isSet(selectedOccasion)"
      :occasion="selectedOccasion"
    />
  </div>
</template>

<script lang="ts">
import OccasionTable from "@/components/u4/OccasionTable.vue";
import OccasionDetailBox from "@/components/u4/OccasionDetailBox.vue";
import { mapState } from "vuex";
import { Options, PropOptions, Vue } from "vue-class-component";
import { Occasion } from "@/entities/occasion";
import { Ut } from "@/service/utils";

@Options({
  name: "OccasionFinderBox",
  components: {
    OccasionTable,
    OccasionDetailBox
  },
  props: {
    occasionArr: {
      type: Array,
      default() {
        return [];
      }
    } as PropOptions<Occasion[]>
  },
  emits: [
    "selected-occasion-event",
    "refresh-occasions-event",
    "clear-occasions-event"
  ],
  data() {
    return { Ut };
  },
  computed: {
    ...mapState("scheduleStore", ["selectedOccasion"])
  },
  methods: {
    /* Event bubbling method */
    selectedOccasionHandler(occasion) {
      console.debug("OccasionFinderBox->selectedOccasionHandler()");
      this.$emit("selected-occasion-event", occasion);
    }
  }
})
export default class OccasionFinderBox extends Vue {}
</script>

<style scoped>
.occasion-finder-box {
  height: 350px;
  max-height: 350px;
}
</style>
