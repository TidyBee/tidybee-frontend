<template>
  <v-card class="rounded-rectangle" elevation="10" :data-cy="`overviewwidget-container`">
    <ApiLoader :api-url="tidyHubApi" widget-name="overView.widgetTitle" class="full-height">
      <template #default="{ data }">
        <div v-if="data">
          <v-tabs v-model="tab" class="custom-tabs" :hide-slider="true">
            <v-tab
              v-for="(item, index) in tabs"
              :key="index"
              :value="item.value"
              :class="{ 'active-tab': activeTab === item.value }"
              :data-cy="`overviewwidget-tabs-${item.value}`"
              @click="changeTab(item.value)"
            >
              {{ $t(`dashboard.widgets.overView.title.${item.label}`) }}
            </v-tab>
          </v-tabs>
          <ListFile :fetchdata="data" :tab="selectedTabLabel" />
        </div>
      </template>
    </ApiLoader>
  </v-card>
</template>

<script>
import ApiLoader from "@/components/communication/ApiLoader.vue";
import ListFile from "@/components/dashboard/widgets/OverView/ListFile.vue";
import VueCookies from "vue-cookies";

export default {
  name: "OverViewWidget",
  components: {
    ListFile,
    ApiLoader,
  },
  props: {
    tidyHubApi: {
      type: String,
      required: true,
    },
  },
  setup() {
    if (!VueCookies.get("activeTab")) {
      VueCookies.set("activeTab", "one", "7d");
    }
    const tabCookie = VueCookies.get("activeTab");
    return {
      tabCookie,
    };
  },
  data() {
    return {
      tab: "one",
      selectedTabLabel: "misnamed",
      activeTab: "",
      tabs: [
        { label: "misnamed", value: "one" },
        { label: "duplicated", value: "two" },
        { label: "unused", value: "three" },
        { label: "heavy", value: "four" },
      ],
    };
  },
  mounted() {
    this.activeTab = this.tabCookie;
  },
  methods: {
    changeTab(value) {
      if (value === this.tab) {
        this.tab = "selectedTab";
        this.activeTab = this.tabs.find((item) => item.value === value).value;
        this.selectedTabLabel = this.tabs.find(
          (item) => item.value === value,
        ).label;
        VueCookies.set("activeTab", this.activeTab);
      } else {
        this.tab = value;
      }
    },
  },
};
</script>

<style src="@/../css/components/dashboard/OverViewWidget.css" scoped></style>
