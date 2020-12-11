<template>
  <div>
    <button
      v-for="tab in tabs"
      :key="tab"
      @click="selected = tab"
      :class="['tab-btn', { active: selected === tab }]"
    >
      {{ tab }}
    </button>

    <component :is="selected" class="tab"></component>
  </div>
</template>

<script>
import OccasionTab from "@/components/u4/tabs/OccasionTab.vue";
import TimeTab from "@/components/u4/tabs/TimeTab.vue";

export default {
  name: "TabWrapper",
  components: {
    OccasionTab,
    TimeTab
  },
  data() {
    return {
      tabs: ["OccasionTab", "TimeTab"], //RequirementsTab, RoomTab
      selected: "OccasionTab"
    };
  }
};
</script>

<style scoped>
.tab-btn {
  padding: 6px 10px;
  background: #ffffff;
  cursor: pointer;
  margin-bottom: 1rem;
  border: 2px solid #cccccc;
  outline: none;
}

.active {
  border-bottom: 3px solid green;
  background: #fcfcf;
}

.tab {
  border: 1px solid #ccc;
  padding: 10px;
}
</style>
