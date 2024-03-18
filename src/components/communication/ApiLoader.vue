<template>
  <div>
    <div
      v-if="isLoading"
      class="full-height d-flex justify-center align-center"
    >
      <v-progress-circular
        indeterminate
        :size="80"
        :width="12"
      ></v-progress-circular>
    </div>
    <div v-else-if="hasError" class="full-height d-flex flex-column justify-center align-center red-bg">
      <v-icon icon="mdi-alert-outline" class="warning-icon"></v-icon>
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
    apiUrl: {
      type: String,
      required: true,
    },
    queryParams: {
      type: Object,
      default: () => ({}),
    },
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
    this.loadData();
  },
  mounted() {
    this.emitter.on("refresh-widgets", (data) => {
      data;
      this.handleRefresh();
    });
  },
  methods: {
    handleRefresh() {
      this.loadData();
    },
    async loadData() {
      this.isLoading = true;
      try {
        this.apiData = await fetchData(this.apiUrl);
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
