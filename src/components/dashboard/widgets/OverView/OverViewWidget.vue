<template>
  <v-card class="rounded-rectangle" elevation="10">
    <v-tabs v-model="tab" class="custom-tabs" :hide-slider="true">
      <v-tab
        v-for="(item, index) in tabs"
        :key="index"
        :value="item.value"
        :class="{ 'active-tab': activeTab === item.value }"
        @click="changeTab(item.value)"
      >
        {{ $t(`dashboard.widgets.overView.title.${item.label}`) }}
      </v-tab>
    </v-tabs>
    <ListFile :tidy-hub-api="tidyHubApi + '/Gateway/getWidgetOverView'" :tab="selectedTabLabel" />
  </v-card>
</template>

<script>
import ListFile from "@/components/dashboard/widgets/OverView/ListFile.vue";

export default {
  name: "OverViewWidget",
  components: {
    ListFile
  },
  props: {
    tidyHubApi: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      tab: "one",
      selectedTabLabel: "misnamed",
      activeTab: "one",
      tabs: [
        { label: "misnamed", value: "one" },
        { label: "duplicated", value: "two" },
        { label: "unused", value: "three" },
        { label: "heavy", value: "four" },
      ],
    };
  },
  methods: {
    changeTab(value) {
      if (value === this.tab) {
        this.tab = "selectedTab";
        this.activeTab = this.tabs.find((item) => item.value === value).value;
        this.selectedTabLabel = this.tabs.find((item) => item.value === value).label;
      } else {
        this.tab = value;
      }
    },
  },
};
</script>

<style scoped>
.rounded-rectangle {
  border-radius: 15px;
  background-color: white;
  height: 460px;
  width: 770px;
  margin-left: 40px;
  margin-top: 20px;
}

.custom-tabs {
  display: relative;
}

.active-tab {
  background-color: white !important;
}

.custom-tabs .v-tab {
  flex: 1;
  background-color: #E8E8E8;
}

.filter-button {
  position: fixed;
  left: 20px;
  bottom: 20px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  min-width: 30px;
  font-size: larger;
  cursor: pointer;
  border: none;
}

</style>