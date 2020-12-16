<template>
  <div>
    <div class="container occasion-finder-box">
      <div class="container-v">
        <h3>Val av tillfälle</h3>
        <p>Välj ett kurstillfälle av {{occasionArr.length}} alternativ nedan</p>
        <OccasionTable
            :occasion-arr="occasionArr"
            @selected-occasion-event="this.selectedOccasionHandler"
        />
        <div>
          <button class="btn-a" type="button" @click="this.$emit('refresh-occasions-event')">
            Alla kurstillfällen
          </button>
          <button type="button" class="btn-a" @click="this.$emit('clear-occasions-event')">
            Rensa
          </button>
        </div>
      </div>
      <OccasionDetailBox
          v-if="occasion"
          :occasion="occasion"
      />
    </div>
  </div>
</template>

<script>
import OccasionTable from "@/components/u4/OccasionTable.vue";
import OccasionDetailBox from "@/components/u4/OccasionDetailBox.vue";

export default {
  name: "OccasionFinderBox",
  components: {
    OccasionTable,
    OccasionDetailBox
  },
  props: {
    occasionArr: Array,
    occasion: Object
  },
  methods: {
    /* Handle event and trigger it again
     * and this is just one of many ways that nested components
     * and event bubbling can be done in Vue.
     */
    selectedOccasionHandler(occasionId) {
      this.$emit("selected-occasion-event", occasionId);
    }
  }
};
</script>

<style scoped>
.occasion-finder-box {
  height: 350px;
}
</style>
