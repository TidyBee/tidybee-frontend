<template>
  <div>
    <div v-if="isLoading" class="full-height">{{ $t("common.loading") }}</div>
    <div v-else-if="hasError" class="full-height">
      {{ $t("apiLoader.errorLoading") }}
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
        console.error(error);
      }
      this.isLoading = false;
    },
  },
};
</script>

<style src="@/../css/communication/ApiLoader.css" />