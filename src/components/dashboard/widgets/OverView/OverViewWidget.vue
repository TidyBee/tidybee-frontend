<template>
  <v-card class="rounded-rectangle" elevation="10" :data-cy="`overviewwidget-container`">
    <ApiLoader :api-url="tidyHubApi + selectedUrl" widget-name="overView.widgetTitle" class="full-height">
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
      selectedTabLabel: "all",
      selectedUrl: "All",
      activeTab: "",
      // dataParse:[{"pretty_path":"/app/tests/assets/test_folder/test-file-9","size":100,"last_modified":{"secs_since_epoch":1707007046,"nanos_since_epoch":332509000},"tidy_score":{"grade":"D","misnamed":{"grade":"E","configurations":null},"unused":{"grade":"A","configurations":null},"duplicated":{"grade":"E","configurations":null}}},{"pretty_path":"/app/tests/assets/test_folder/test-file-2","size":100,"last_modified":{"secs_since_epoch":1707007046,"nanos_since_epoch":332102000},"tidy_score":{"grade":"D","misnamed":{"grade":"E","configurations":null},"unused":{"grade":"A","configurations":null},"duplicated":{"grade":"E","configurations":null}}},{"pretty_path":"/app/tests/assets/test_folder/test-file-1","size":100,"last_modified":{"secs_since_epoch":1707007046,"nanos_since_epoch":331979000},"tidy_score":{"grade":"D","misnamed":{"grade":"E","configurations":null},"unused":{"grade":"A","configurations":null},"duplicated":{"grade":"F","configurations":null}}},{"pretty_path":"/app/tests/assets/test_folder/test-file-4","size":100,"last_modified":{"secs_since_epoch":1707007046,"nanos_since_epoch":332219000},"tidy_score":{"grade":"D","misnamed":{"grade":"E","configurations":null},"unused":{"grade":"A","configurations":null},"duplicated":{"grade":"E","configurations":null}}},{"pretty_path":"/app/tests/assets/test_folder/test-file-10","size":100,"last_modified":{"secs_since_epoch":1707007046,"nanos_since_epoch":332042000},"tidy_score":{"grade":"D","misnamed":{"grade":"E","configurations":null},"unused":{"grade":"A","configurations":null},"duplicated":{"grade":"E","configurations":null}}},{"pretty_path":"/app/tests/assets/test_folder/test-file-5","size":100,"last_modified":{"secs_since_epoch":1707007046,"nanos_since_epoch":332279000},"tidy_score":{"grade":"D","misnamed":{"grade":"E","configurations":null},"unused":{"grade":"A","configurations":null},"duplicated":{"grade":"E","configurations":null}}}],
      tabs: [
        { label: "all", url: "All", value: "one" },
        { label: "misnamed", url: "Misnamed", value: "two" },
        { label: "duplicated", url: "Duplicate", value: "three" },
        { label: "unused", url: "Unused", value: "four" },
      ],
    };
  },
  mounted() {
    this.activeTab = this.tabCookie;
    this.selectedTabLabel = this.tabs.find(
          (item) => item.value === this.tabCookie,
    ).label;
    this.selectedUrl = this.tabs.find(
          (item) => item.value === this.tabCookie,
    ).url;
    this.changeTab(this.tabCookie);
  },
  methods: {
    changeTab(value) {
      if (value === this.tab) {
        this.tab = "selectedTab";
        this.activeTab = this.tabs.find((item) => item.value === value).value;
        this.selectedTabLabel = this.tabs.find(
          (item) => item.value === value,
        ).label;
        this.selectedUrl = this.tabs.find(
          (item) => item.value === value,
        ).url;
        VueCookies.set("activeTab", this.activeTab);
      } else {
        this.tab = value;
      }
      this.emitter.emit("overView.widgetTitle", {url: this.tidyHubApi + this.selectedUrl});
    },
  },
};
</script>

<style src="@/../css/components/dashboard/OverViewWidget.css" scoped></style>
