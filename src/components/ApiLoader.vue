<template>
  <div>
    <div v-if="isLoading">{{ $t("common.loading") }}</div>
    <div v-else-if="hasError">{{ $t("apiLoader.errorLoading") }}</div>
    <div v-else>
      <slot :data="apiData" />
    </div>
  </div>
</template>

<script>
import { fetchData } from "@/communication/communication.js";

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
  methods: {
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
