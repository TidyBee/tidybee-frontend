<template>
  <div>
    <div v-if="isLoading" class="full-height d-flex justify-center align-center">
      <div class="widget-title">{{ $t('dashboard.widgets.' + widgetName) }}</div>
      <v-progress-circular indeterminate :size="80" :width="12"></v-progress-circular>
    </div>
    <div v-else-if="hasError" class="full-height d-flex flex-column justify-center align-center red-bg">
      <div :data-cy="`widget-loading-failed`" class="widget-title widget-fail-title text-left">{{ $t('dashboard.widgets.' + widgetName) }}</div>
      <v-icon icon="mdi-alert-outline" class="warning-icon" :style="isTextWidget ? `font-size: 2em !important` : ``"></v-icon>
      <br>
      <strong>{{ $t("apiLoader.errorLoading") }}</strong>
      <br>
      ({{ error }})
    </div>
    <div v-else class="full-height">
      <slot :data="apiData" />
    </div>
  </div>
</template>

<script>
import { fetchData } from "@/components/communication/communication.js";

export default {
  props: {
    widgetName: {
      type: String,
      required: true,
    },
    apiUrl: {
      type: String,
      required: true,
    },
    queryParams: {
      type: Object,
      default: () => ({}),
    },
    isTextWidget: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      apiData: {},
      isLoading: false,
      hasError: false,
      error: "",
    };
  },
  created() {
    this.loadData(this.apiUrl);
  },
  mounted() {
    this.emitter.on("refresh-widgets", (data) => {
      data;
      this.handleRefresh(this.apiUrl);
    });
    this.emitter.on(this.widgetName, (data) => {
      data;
      this.handleRefresh(data.url);
    })
  },
  methods: {
    handleRefresh(url) {
      this.loadData(url);
    },
    async loadData(url) {
      this.isLoading = true;
      try {
        this.apiData = await fetchData(url);
      } catch (error) {
        this.hasError = true;
        this.isLoading = false;
        this.error = error.message;
      }
      this.isLoading = false;
    },
  },
};
</script>

<style src="@/../css/communication/ApiLoader.css" />
