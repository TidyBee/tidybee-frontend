<template>
  <!-- <v-main class="bg-grey-lighten-3"> -->
  <!-- <GridComponent ref="gridRef" :tidy-hub-api="tidyHubApi" /> -->
  <!-- </v-main> -->
  <DashBoard />
</template>

<script>
// import GridComponent from "@/components/GridComponent.vue";
import DashBoard from "@/components/dashboard/DashBoard.vue";

export default {
  name: "MainPage",
  components: {
    // GridComponent,
    DashBoard,
  },
  data() {
    return {
      tidyHubApi: process.env.VUE_APP_HUB,
      widgets: [
        {
          name: "Heaviest",
          displayName: "Top Heaviest Files",
          apiEndpoint: "/proxy/get_files?amount=5&sort_by=size",
          widgetType: "FileList",
        },
        {
          name: "Unused",
          displayName: "Top Unused Files",
          apiEndpoint: "/proxy/get_files?amount=5&sort_by=size",
          widgetType: "FileList",
        },
        {
          name: "Misnamed",
          displayName: "Top misnamed Files",
          apiEndpoint: "/proxy/get_files?amount=5&sort_by=size",
          widgetType: "FileList",
        },
        {
          name: "TextWidget",
          displayName: "Text Widget",
          apiEndpoint: "/proxy/get_files?amount=5&sort_by=size",
          widgetType: "TextWidget",
        },
        {
          name: "Directory",
          displayName: "Folder tracker",
          apiEndpoint: "/proxy/get_files?amount=5&sort_by=size",
          widgetType: "FolderWidget",
        },
      ],
    };
  },
  computed: {
    visibleWidgets() {
      return this.widgets.filter((widget) => widget.show);
    },
  },
  methods: {
    handleToggleWidget(widgetName, size) {
      this.widgets.forEach((widget) => {
        if (widgetName === widget.name) {
          this.$refs.gridRef.addWidget(widget, size);
        }
      });
    },
  },
};
</script>

<style src="@/css/MainPage.css" scoped></style>
