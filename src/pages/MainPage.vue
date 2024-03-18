<template>
  <DashBoard />
</template>

<script>
import DashBoard from "@/components/dashboard/DashBoard.vue";

export default {
  name: "MainPage",
  components: {
    DashBoard,
  },
  data() {
    return {
      tidyHubApi: process.env.VUE_APP_HUB,
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

<style src="@/../css/pages/MainPage.css" scoped></style>
