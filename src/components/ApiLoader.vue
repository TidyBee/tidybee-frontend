<template>
  <div>
    <div v-if="isLoading">
      Loading...
    </div>
    <div v-else-if="hasError">
      Error loading data
    </div>
    <div v-else>
      <slot :data="apiData" /> 
    </div>
  </div>
</template>

<script>
import {getData} from '../communication/communication.js'

export default {
  props: {
    apiUrl: {
      type: String,
      required: true
    },
    queryParams: {
      type: Object,
      default: () => ({}),
    }
  },
  data() {
    return {
      apiData: {},
      isLoading: false,
      hasError: false
    }
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      this.isLoading = true;
      try {
        this.apiData = await getData(this.apiUrl);
      } catch (error) {
        this.hasError = true;
        this.isLoading = false;
        console.error(error);
      }
      this.isLoading = false;
    }
  }
}
</script>
  