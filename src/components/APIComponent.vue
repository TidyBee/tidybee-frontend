<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="hasError">Error loading data</div>
    <div v-else>
      <slot :data="apiData"></slot>
    </div>
  </div>
</template>

<script>
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
    loadData() {
      this.isLoading = true;

      // Build the URL with query parameters
      const url = new URL(this.apiUrl);
      Object.keys(this.queryParams).forEach(key => {
        url.searchParams.append(key, this.queryParams[key]);
      });

      // Fetch data from the constructed URL
      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.apiData = data;
          this.isLoading = false;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          this.hasError = true;
          this.isLoading = false;
        });
    }
  }
}
</script>
  