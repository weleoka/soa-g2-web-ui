/* EA & SOA Group 2 HT2020 Menu items for working with course schedules. */
<template>
  <div class="container-v" id="tab-view">
    <div id="tab-button-bar">
      <button
        v-for="tab in tabs"
        :key="tab"
        @click="selected = tab.id"
        :class="['tab-btn', { active: selected === tab.id }]"
      >
        {{ tab.text }}
      </button>
      {{}}
    </div>

    <keep-alive>
      <component class="tab" :is="selectedTab" />
    </keep-alive>

    <div class="d-flex justify-content-around" id="tab-pn-btn-box">
      <button @click="goPrev" class="tab-btn">Förgående</button>
      <button @click="goNext" class="tab-btn">Nästa</button>
    </div>
  </div>
</template>

<script lang="ts">
// static import of components
//import OccasionTab from "@/components/u4/tabs/OccasionTab.vue";
//import TimeTab from "@/components/u4/tabs/TimeTab.vue";

// dynamic imports of components
import { defineAsyncComponent } from "@vue/runtime-core";
import { Options, Vue } from "vue-class-component";

const OccasionTab = defineAsyncComponent(() =>
  import("@/components/u4/tabs/OccasionTab.vue")
);
const TimeTab = defineAsyncComponent(() =>
  import("@/components/u4/tabs/TimeTab.vue")
);
const RequirementsTab = defineAsyncComponent(() =>
  import("@/components/u4/tabs/RequirementsTab.vue")
);
const RoomTab = defineAsyncComponent(() =>
  import("@/components/u4/tabs/RoomTab.vue")
);

@Options({
  component: "TabBar",
  components: {
    /*    OccasionTab: defineAsyncComponent(() => // todo: list dynamic components under components!
        import("@/components/u4/tabs/OccasionTab.vue")
    ),*/
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
        },
        {
          id: 2,
          name: "RequirementsTab",
          text: "Välj behov"
        },
        {
          id: 3,
          name: "RoomTab",
          text: "Välj rum"
        }
      ],
      selected: 1 // keeps id of tab only.
    };
  },
  computed: {
    selectedTab() {
      if (this.selected === 0) return OccasionTab;
      if (this.selected === 1) return TimeTab;
      if (this.selected === 2) return RequirementsTab;
      if (this.selected === 3) return RoomTab;
      return OccasionTab; // default return if nothing is selected.
    }
  },
  methods: {
    goNext() {
      this.selected >= 0 && this.selected <= 2
        ? this.selected++
        : this.selected;
    },
    goPrev() {
      this.selected >= 1 && this.selected <= 3
        ? this.selected--
        : this.selected;
    }
  }
})
export default class TabBar extends Vue {}
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

/* previous and next button styling */
#tab-pn-btn-box {
  margin-top: 2rem;
  padding-top: 40px;
}

#tab-pn-btn-box .tab-btn {
  width: 115px;
}
.active {
  border-bottom: 3px solid green;
}

.tab {
  border: 1px solid #ccc;
  border-top: none;
  border-bottom: none;
  padding: 0px 10px 10px 10px;
}

@media (min-width: 1000px) {
  #tab-view {
    width: 950px;
  }
}

#tab-view div {
}
</style>
