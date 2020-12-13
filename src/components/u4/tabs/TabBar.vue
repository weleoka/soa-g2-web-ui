/* EA & SOA Group 2 HT2020

Menu items for working with schedules.

The issue with the current method is that this route /scheduleservice will become
large and currently not made up of lazy-loaded application parts under these "Tabs" so to speak.
*/
<template>
  <div>
    <button
      v-for="tab in tabs"
      :key="tab"
      @click="selected = tab"
      :class="['tab-btn', { active: selected === tab }]"
    >
      {{ tab.text }}
    </button>

    <component :is="selected" class="tab"></component>
  </div>
</template>

<script>
import OccasionTab from "@/components/u4/tabs/OccasionTab.vue";
import TimeTab from "@/components/u4/tabs/TimeTab.vue";

export default {
  name: "TabBar",
  components: {
    OccasionTab,
    TimeTab
  },
  data() {
    return {
      tabs: [
        {
          name: "OccasionTab",
          text: "Välj kurs"
        },
        {
          name: "TimeTab",
          text: "Välj tid"
        }
      ], //RequirementsTab, RoomTab
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
