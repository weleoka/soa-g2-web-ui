/* EA & SOA Group 2 HT2020

Menu items for working with course schedules.

*/
<template>
  <div class="container-v">
    <div id="tab-button-bar">
      <button
        v-for="tab in tabs"
        :key="tab"
        @click="selected = tab.id"
        :class="['tab-btn', { active: selected === tab.id }]"
      >
        {{ tab.text }}
      </button>
    </div>
    <keep-alive>
      <component :is="selectedTab" />
    </keep-alive>
    <div>
      <hr>
    </div>
    <div class="d-flex justify-content-around">
      <button class="tab-btn">Förgående</button>
      <div></div>
      <button class="tab-btn">Nästa</button>
    </div>
  </div>
</template>

<script>
// static import of components
//import OccasionTab from "@/components/u4/tabs/OccasionTab.vue";
//import TimeTab from "@/components/u4/tabs/TimeTab.vue";

// dynamic imports of components
import {defineAsyncComponent} from "@vue/runtime-core";
const OccasionTab = defineAsyncComponent(() =>
    import("@/components/u4/tabs/OccasionTab.vue")
);
const TimeTab = defineAsyncComponent(() =>
    import("@/components/u4/tabs/TimeTab.vue")
);

export default {
  component: "TabBar",
  components: {
/*    OccasionTab: defineAsyncComponent(() => // todo: list dynamic components under components!
        import("@/components/u4/tabs/OccasionTab.vue")
    ),
    TimeTab: defineAsyncComponent(() =>
        import("@/components/u4/tabs/TimeTab.vue")
    )*/
    //OccasionTab,
    //TimeTab
  },
  data() {
    return {
      tabs: [
        {
          id: 0,
          name: "OccasionTab",
          text: "Välj kurs"
        },
        {
          id: 1,
          name: "TimeTab",
          text: "Välj tid"
        }
      ], //RequirementsTab, RoomTab
      selected: 0 // keeps id of tab only.
    };
  },
  computed: {
    selectedTab() {
      if (this.selected === 0) {
        return OccasionTab;
      }
      if (this.selected === 1) return TimeTab;
      //if (selected === 2) return RequirementsTab;
      //if (selected === 3) return RoomTab;
      return OccasionTab; // default return if nothing is selected.
    }
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
